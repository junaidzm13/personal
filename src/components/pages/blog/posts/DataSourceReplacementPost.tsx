import React from 'react';
import { dracula } from 'react-code-blocks';
import styled from 'styled-components';
import { InlineCode } from './common/InlineCode';
import { Note } from './common/Note';
import { CodeSnippet } from './common/CodeSippet';
import { fromPublic } from '../../../../utils/fromPublic';
import { Icon } from '../../../common/icons/Icon';

export const DataSourceReplacementPost: React.FC = () => {
  return (
    <>
      <p>
        I recently led a cross-functional team to replace a critical datasource
        under a strict time constraint while ensuring minimal impact on our
        daily operations. In this blog, I will be outlining the steps we took to
        ensure successful delivery.
      </p>
      <p>
        Lets start with a diagram which would help you get a better
        understanding of the high-level system design of our solution:
      </p>
      <SystemDesignImgWrapper>
        <img
          src={fromPublic('datasource-replacement-system-design.png')}
          alt="System design"
          style={{ maxWidth: '40em', minWidth: '20em' }}
        />
      </SystemDesignImgWrapper>
      <p style={{ marginBottom: 0 }}>
        First, we introduced a common interface that would directly be consumed
        by the downstream dependencies. This gave us the following benefits:
      </p>
      <ol>
        <li>
          <p>
            The implementation details and the underlying datasources were
            hidden from the consumers of the interface. All they should care is
            that the contract (as defined by the interface) is upheld.
          </p>
        </li>
        <li>
          <p>
            If we ever switch to yet another datasource in the future, the
            consumers wouldn't even notice.
          </p>
        </li>
        <li>
          <p>
            Allowed us to use runtime config to switch between datasources
            without a single line of code change.
          </p>
        </li>
        <li>
          <p>
            Made reconciliation of the data from the two datasources effortless
            as both were bound by the interface to return the same type.
          </p>
        </li>
      </ol>
      <CodeSnippet
        text={interfaceCode}
        language={'kotlin'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
      />
      <p>
        Moreoever, interface itself was intentionally chosen to be similar to
        the interface of the existing datasource client. This ensured that the
        changes in our downstream dependencies were kept to a minimal.
      </p>
      <p>
        We then created adapters to "adapt" the respective datasource client(s)
        to the common interface. Finally, we used a factory pattern to
        seamlessly determine the appropriate adapter and hence, the datasource,
        depending on the arguments passed — abstracting away the instantiation
        logic from the downstream:
      </p>
      <CodeSnippet
        text={factoryCode}
        language={'kotlin'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
      />
      <CodeSnippet
        text={dataSourceCode}
        language={'kotlin'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
        style={{ marginTop: '1em' }}
      />
      <Note style={{ marginTop: 0 }}>
        * <InlineCode>sealed</InlineCode> guarantees that the interface is not
        extendable outside of the compilation unit. For our use-case, we used it
        as an "enum with superpowers".{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://stackoverflow.com/questions/50772328/what-are-sealed-classes-in-kotlin"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Read more <Icon name="open-link" />
        </a>
      </Note>
      <p>
        Factory pattern also made it easier to feature-flag the underlying data
        source so that we can control when / who consumes what — key to
        performing thorough testing before going live.
      </p>
      <p>
        Lastly, given the sensitivity of the change, we further used cron jobs
        to perform reconciliation of the data from both datasources to verify
        the correctness of our map/reduce logic. Which actually helped remediate
        some of the subtle discrepancies before we went live in production.
      </p>
      <p>That's all for this one, hope you learned something new! :)</p>
    </>
  );
};

const interfaceCode = `interface TheCommonClient {
    fun method1(...): ReturnType
    ...
}`;

const factoryCode = `class CommonClientFactory {
    fun create(
        dataSource: DataSource,
        restTemplate: RestTemplate,
        retryTemplate: RetryTemplate
    ) : TheCommonClient {
        when (dataSource) {
            is ExistingDataSource -> Adapter1(
                client = ClientOfExistingDataSource(...)
            )
            is NewDataSource -> Adapter2(
                client1 = Client1OfNewDataSource(...),
                ...
            )
        }
    }
}`;

const dataSourceCode = `sealed interface DataSource

data class ExistingDataSource(params: ...) : DataSource

data class NewDataSource(params: ...) : DataSource
`;

const SystemDesignImgWrapper = styled.div`
  overflow-x: scroll;
`;
