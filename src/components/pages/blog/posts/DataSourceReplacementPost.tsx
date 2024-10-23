import React from 'react';
import { dracula } from 'react-code-blocks';
import styled from 'styled-components';
import { InlineCode } from './InlineCode';
import { Note } from './Note';
import { CodeSnippet } from './CodeSippet';
import { fromPublic } from '../../../../utils/fromPublic';

export const DataSourceReplacementPost: React.FC = () => {
  return (
    <>
      <p>
        Recently, I lead a cross-functional team to replace a critical
        datasource. The aim was to replace it as soon as possible with minimal
        impact on our daily operations. In this blog I'll be documenting the
        high-level design of how my team and I approached this challenge.
      </p>
      <p>
        The diagram below depicts the high-level system design of our solution:
      </p>
      <SystemDesignImgWrapper>
        <img
          src={fromPublic('datasource-replacement-system-design.png')}
          alt="System design"
          style={{ maxWidth: '40em', minWidth: '20em' }}
        />
      </SystemDesignImgWrapper>
      <p style={{ marginBottom: 0 }}>
        We first introduced a common interface that would directly be consumed
        by the downstream dependencies. This gave us the following benefits:
      </p>
      <ol>
        <li>
          <p>
            The implementation details and the underlying data source was hidden
            from the consumers of the interface. All they should care is that
            the contract (as defined by the interface) is upheld.
          </p>
        </li>
        <li>
          <p>
            If we ever switch to yet another data source in the future, the
            consumers wouldn't even notice.
          </p>
        </li>
        <li>
          <p>
            Made it possible to use runtime config to switch between
            datasources.
          </p>
        </li>
        <li>
          <p>
            Made reconciliation of the data from the two data sources effortless
            as both data sources were bound by the interface to return the same
            type.
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
        the interface of the existing data source client. This made sure that
        the changes in our downstream dependencies are kept to a minimal.
      </p>
      <p>
        We then created adapters at the data source level to "adapt" the
        respective client(s) to the common interface. Finally, we used a factory
        pattern to seamlessly determine the appropriate data source depending on
        the arguments passed, abstracting away the instantiation logic from the
        downstream:
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
        * <InlineCode>sealed</InlineCode> makes sure that the interface is not
        extendable outside of the file. This makes sure that 1) the passed data
        sources are the ones that we expect 2) the reader can easily see what
        are the available subtypes.
      </Note>
      <p>
        Factory pattern also made it easier to feature-flag the underlying data
        source so that we can control when / who consumes what — key to
        performing A/B testing.
      </p>
      <p>
        Given the sensitivity of the change, I made sure that we perform
        reconciliation of the data from both data sources in order to make sure
        that all the map/reduce logic is correct on our end. For that, we ran
        cron jobs, and it actually helped remediate some of the subtle
        discrepancies before we went live in production. This again, as
        mentioned, was made easy by the common interface and the factory.
      </p>
      <p>
        That's all for this one, hope you learned something new! Feel free to
        reach out in case you have any suggestions/comments or if you'd like to
        connect and/or have a chat! :)
      </p>
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
