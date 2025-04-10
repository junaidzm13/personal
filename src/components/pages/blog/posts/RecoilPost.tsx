import React from 'react';
import { Note } from './common/Note';
import { NewTabLink } from '../../../common/NewTabLink';
import { colors } from '../../../../theme/colors';

export const RecoilPost: React.FC = () => {
  return (
    <>
      <p>
        State management in React can get tricky as your app grows. Not only the
        data flow becomes complex to handle, but if you have deeply nested
        components that all share the same global state you can even run into
        performance issues related to unnecessary re-renders of the component
        tree. That is exactly what happened with our enterprise CMS.
      </p>
      <p>
        We started off with vanilla React (useState, useContext, etc.) together
        with throttling to prevent frequent re-renders but as more and more
        functionality, and hence, components, were introduced, we started
        experiencing slowness affecting the user experience. After every few
        keystrokes from the user, the whole CMS re-rendered.
      </p>
      <p>
        On top, the codebase was becoming complex to work with. We had to pass
        state and its handlers deep down the massive CMS component tree.
      </p>
      <p>
        This is when we started looking for off-the-shelf state management
        solutions that could help us turn things around and eventually the team
        collectively decided to give{' '}
        <NewTabLink iconColor={colors.GRAY_4} to="https://recoiljs.org">
          Recoil JS
        </NewTabLink>{' '}
        a try. And yes, you guessed it write, it worked like a charm!
      </p>
      <p>
        By breaking the global state into smaller, more focused atoms, we
        localized state updates to only the parts of the app that needed them.
        The result? A 3x performance boost.
      </p>
      <p>
        It didn't just stop there. With Recoil, we no longer had to pass the
        global state down through deeply nested components. This simplified the
        codebase dramatically and made everything easier to read, maintain, and
        debug.
      </p>
      <Note>
        <NewTabLink
          iconColor={colors.GRAY_4}
          to="https://github.com/junaidzm13/cms-recoil-prototype"
        >
          Try it out yourself
        </NewTabLink>
      </Note>
      <h3>So, what is Recoil?</h3>
      <p>A "Reactish" state management library developed by Facebook.</p>
      <p>
        Instead of the traditional top-down approach to state (where state is
        passed from a parent component to its children), Recoil lets you break
        your state into smaller, independent pieces called <i>atoms</i>. Think
        of atoms as the building blocks of your app's state—each one represents
        the smallest unit of state that can be shared across components. The
        beauty of this approach is that updates to an atom only affect the
        components that depend on it, making your app faster and more efficient.
      </p>
      <p>
        In simple terms, Recoil behaves like multiple React Contexts but with
        one major advantage: they don't trigger unnecessary re-renders. If
        you've ever struggled with performance issues caused by React Context
        updating everything, Recoil feels like a breath of fresh air.
      </p>
      <p>
        What's even better is that Recoil doesn't come with the baggage of
        boilerplate code you'd encounter in something like Redux. No reducers,
        no actions - just clean, straightforward state management.
      </p>
      <h3>Should you use Recoil for your project?</h3>
      <p style={{ marginBottom: 0 }}>
        As always, it depends on your use-case. While Recoil worked quite well
        for us, it certainly isn't a silver bullet. For most projects, plain
        React is usually sufficient. State management libraries can become
        helpful if:
        <Note>
          Even in these cases, give React Context/Reducer/Memo a try. You'd be
          surprised how far these can take you.
        </Note>
      </p>
      <ul>
        <li>
          <p>Your app's state is getting harder to manage and maintain.</p>
        </li>
        <li>
          <p>
            You're running into performance issues because of frequent
            re-renders.
          </p>
        </li>
        <li>
          <p>
            Your data flow is becoming complicated, and passing props around
            feels like a tangled mess.
          </p>
        </li>
      </ul>
      <p>
        That said, adding a library means taking on extra dependencies and
        introducing a learning curve for your team. Make sure you understand the
        trade-offs and whether the benefits outweigh the cost for your
        particular use case.
      </p>
      <p>
        If you're exploring alternatives, other great options include{' '}
        <NewTabLink iconColor={colors.GRAY_4} to="https://jotai.org">
          Jotai
        </NewTabLink>
        {', '}
        <NewTabLink iconColor={colors.GRAY_4} to="https://zustand.docs.pmnd.rs">
          Zustand
        </NewTabLink>
        {' and '}
        <NewTabLink iconColor={colors.GRAY_4} to="https://redux-toolkit.js.org">
          Redux Toolkit
        </NewTabLink>
        {'.'}
      </p>
      <p>
        But definitely give it a try as a POC — you might just find yourself
        wondering how you ever managed without it.
      </p>
    </>
  );
};
