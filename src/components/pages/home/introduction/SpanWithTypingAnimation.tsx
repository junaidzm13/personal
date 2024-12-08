import React, { useEffect, useMemo, useState } from 'react';

interface Props {
  texts: Array<string>;
  className?: string;
}

export const SpanWithTypingAnimation: React.FC<Props> = props => {
  const { texts } = props;
  const [state, setState] = useState<AnimationState>({
    textIndex: 0,
    endCharacterIndex: 0,
    intervalsFullTextShown: 1,
  });

  useEffect(() => {
    const interval = setInterval(
      () => setState(s => getNewState(s, texts)),
      DURATION_BETWEEN_EACH_CHAR_CHANGE_MS
    );

    return () => clearInterval(interval);
  }, [texts]);

  const displayedText = useMemo(
    () => texts[state.textIndex].slice(0, state.endCharacterIndex),
    [texts, state]
  );

  return <span className={props.className}>{displayedText}</span>;
};

type AnimationState = {
  textIndex: number;
  endCharacterIndex: number;
  intervalsFullTextShown: number;
};

function getNewState(
  prevState: AnimationState,
  texts: Props['texts']
): AnimationState {
  switch (getNextAction(prevState, texts)) {
    case 'pause':
      return {
        ...prevState,
        intervalsFullTextShown: prevState.intervalsFullTextShown + 1,
      };
    case 'change':
      return {
        textIndex: (prevState.textIndex + 1) % texts.length,
        endCharacterIndex: prevState.endCharacterIndex + 1,
        intervalsFullTextShown: 0,
      };
    case 'forward':
      return {
        ...prevState,
        endCharacterIndex: prevState.endCharacterIndex + 1,
      };
    case 'backward':
      return {
        ...prevState,
        endCharacterIndex: 0,
      };
  }
}

const DURATION_TO_SHOW_FULL_TEXT_MS = 2000;
const DURATION_BETWEEN_EACH_CHAR_CHANGE_MS = 25;
const DURATION_TO_SHOW_FULL_TEXT_AS_A_FACTOR_OF_EACH_CHAR_CHANGE =
  DURATION_TO_SHOW_FULL_TEXT_MS / DURATION_BETWEEN_EACH_CHAR_CHANGE_MS;

type NextAction = 'forward' | 'backward' | 'pause' | 'change';

function getNextAction(
  state: AnimationState,
  texts: Props['texts']
): NextAction {
  if (
    state.intervalsFullTextShown ===
      DURATION_TO_SHOW_FULL_TEXT_AS_A_FACTOR_OF_EACH_CHAR_CHANGE &&
    state.endCharacterIndex !== 0
  ) {
    return 'backward';
  } else if (state.endCharacterIndex === texts[state.textIndex].length) {
    return 'pause';
  } else if (
    state.endCharacterIndex === 0 &&
    state.intervalsFullTextShown ===
      DURATION_TO_SHOW_FULL_TEXT_AS_A_FACTOR_OF_EACH_CHAR_CHANGE
  ) {
    return 'change';
  } else {
    return 'forward';
  }
}
