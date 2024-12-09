import React from 'react';
import { dracula } from 'react-code-blocks';
import { InlineCode } from './common/InlineCode';
import { Note } from './common/Note';
import { CodeSnippet } from './common/CodeSippet';

export const CleanReactPost: React.FC = () => {
  return (
    <>
      <p>
        This is the first in the series of short blogs where I'll be sharing my
        experiences, insights and industry best-practices. Lets jump right into
        it.
      </p>
      <p>
        While revamping and redesigning our content management and distribution
        system (as well as when reading React code examples online), I noticed
        that whenever React developers require an input from a user they'd use a
        pattern something like:
      </p>
      <CodeSnippet
        text={code1}
        language={'typescript'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
      />
      <p style={{ marginBottom: 0 }}>
        In my opinion, the above code, although syntactically correct, has a lot
        of repetition and potential for things to go wrong:
      </p>
      <ol>
        <li>
          <p>
            The code is not scalable, the complexity and the clutter would
            increase with more fields.
          </p>
        </li>
        <li>
          <p>
            All the <InlineCode>label</InlineCode>'s are constants and should be
            treated as such. Can be easily defined outside of the component
            using a <InlineCode>Record</InlineCode>, as you'll see shortly.
          </p>
        </li>
        <li>
          <p>
            The callbacks do exactly the same thing but for different fields.
          </p>
        </li>
      </ol>
      <p>
        One solution to the above I've found to be quite effective is to use{' '}
        <InlineCode>TypeScript</InlineCode> generics and higher-order functions*
        to define a single callback that can be used for all the fields:
      </p>
      <CodeSnippet
        text={code2}
        language={'typescript'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
      />
      {p2s.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
      <Note>
        * higher-order functions or HOFs are functions that either return
        another function or take functions as a parameter.
      </Note>
    </>
  );
};

const code1 = `type SomeDocument = {
  checkbox1: boolean;
  checkbox2: boolean;
  textInput: string;
};

type Props = {
  value: SomeDocument;
  onChange: (s: SomeDocument) => void;
};

export const SomeFormComponent: React.FC<Props> = props => {
  const { value, onChange } = props;

  const onCheckbox1Change = useCallback(
    (v: boolean) => onChange({ ...value, checkbox1: v }),
    [value, onChange]
  );

  const onCheckbox2Change = useCallback(
    (v: boolean) => onChange({ ...value, checkbox2: v }),
    [value, onChange]
  );

  const onTextChange = useCallback(
    (t: string) => onChange({ ...value, textInput: t }),
    [value, onChange]
  );

  return (
    <Wrapper>
      <CheckBox
        label="Label for checkbox-1"
        value={value.checkbox1}
        onChange={onCheckbox1Change}
      />
      <CheckBox
        label="Label for checkbox-2"
        value={value.checkbox2}
        onChange={onCheckbox2Change}
      />
      <TextInput
        label="Label for text-input"
        value={value.textInput}
        onChange={onTextChange}
      />
    </Wrapper>
  );
};`;

const code2 = `export const CleanFormComponent: React.FC<Props> = props => {
  const { value, onChange } = props;

  // HOF callback, takes a field name and returns the relevant 'onChange' handler.
  const getOnChange = useCallback(
    <Key extends keyof SomeDocument>(key: Key) =>
      (v: SomeDocument[Key]) => onChange({ ...value, [key]: v }),
    [value, onChange]
  );

  return (
    <Wrapper>
      {(['checkbox1', 'checkbox2'] as const).map(f => (
        <CheckBox
          label={labelsByField[f]}
          value={value[f]}
          onChange={getOnChange(f)}
        />
      ))}
      <TextInput
        label={labelsByField['textInput']}
        value={value['textInput']}
        onChange={getOnChange('textInput')}
      />
    </Wrapper>
  );
};

const labelsByField: Record<keyof SomeDocument, string> = {
  checkbox1: 'Label for checkbox-1',
  checkbox2: 'Label for checkbox-2',
  textInput: 'Label for text-input',
};`;

const p2s = [
  'Here you can also see how we treat labels as constants and define them outside of the component. Keeping the component itself scalable, clean and concise.',
  'This is one of the ways how I helped my team massively reduce techical debt while leading the revamp of our CMS with mission-critical enhancements.',
  "That's all for now — hope you learned something new! If you have any suggestions, comments, or just want to connect and chat, feel free to reach out!",
];
