import React from 'react';
import { dracula } from 'react-code-blocks';
import { InlineCode } from './common/InlineCode';
import { Note } from './common/Note';
import { CodeSnippet } from './common/CodeSippet';
import { NewTabLink } from '../../../common/NewTabLink';

export const ParameterizedSqlBuilder: React.FC = () => {
  return (
    <>
      <p>
        Vuu, a UBS open-source project, primarily used WebSockets to handle
        communication between its server and the client. So any change in
        dynamic filter or sort queries was also handled over WebSockets — the
        query gets sent to the server, the server uses ANTLR to parse the
        expression and then converts the parsed expression to SQL query for the
        external datasource to understand. Initial implementation of this query
        conversion step was a bit naive as it used plain string concatenation to
        build SQL — implicitly assuming that ANTLR would detect and error on any
        malicious queries from the UI.
      </p>
      <p>
        When working as a full-stack developer for VUU, I came across this and
        immediately identified the risk of potential{' '}
        <NewTabLink to={'https://en.wikipedia.org/wiki/SQL_injection'}>
          SQL injection attacks
        </NewTabLink>{' '}
        posing a serious threat to our data security. In this post, I will
        outline the clean and extendable solution that I proposed, designed and
        developed.
      </p>
      <p>
        Here is the main class of the parameterized SQL builder that I proposed:
      </p>
      <CodeSnippet
        text={igniteSQLQueryClass}
        language={'scala'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
      />
      <p>And here is one example of how it was used:</p>
      <CodeSnippet
        text={usageExample1}
        language={'scala'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
      />
      <Note style={{ marginTop: 0 }}>
        * To view the full merge request:{' '}
        <NewTabLink to="https://github.com/finos/vuu/pull/1319">
          !1319
        </NewTabLink>
      </Note>
      <p>
        The following key design principles ensured that the solution was
        thread-safe, extensible and easy to use:
        <ul>
          <li>
            <strong>Immutability and thread-safety:</strong> Each{' '}
            <InlineCode>append</InlineCode> and <InlineCode>prepend</InlineCode>{' '}
            method returns a copy, prioritizing immutability and thread-safety.
          </li>
          <li>
            <strong>Extensibility:</strong> The initial implementation only
            catered for <InlineCode>Ignite</InlineCode>, but can easily be
            extended to support additional data sources by adding a new
            datasource specific <InlineCode>build</InlineCode> method.
            Similarly, separator enum can be extended to support other SQL
            use-cases.
          </li>
          <li>
            <strong>Ease of use:</strong> Various ways to build a query through
            static constructors, various append/prepend builder methods and
            query separators. Moreoever, <InlineCode>QuerySeparator</InlineCode>{' '}
            enum not only ensures strong typing but also helps users to easily
            view the supported separators.
          </li>
        </ul>
      </p>
      <p>
        That's all I wanted to share today! I hope that in the future whenever
        your team is in a similar situation, you can utilize the same design
        philosophies to develop solutions that align with industry
        best-practices.
      </p>
    </>
  );
};

const igniteSQLQueryClass = `...
 // companion object for IgniteSqlQuery
 object IgniteSqlQuery {
   // static methods to create IgniteSqlQuery
   def apply(sqlTemplate: String): IgniteSqlQuery = new IgniteSqlQuery(sqlTemplate, List.empty)
   def apply(): IgniteSqlQuery = IgniteSqlQuery("")
   def empty: IgniteSqlQuery = IgniteSqlQuery()

   // enum for query separators
   sealed abstract class QuerySeparator(val value: String)
   object QuerySeparator {
     final case object AND extends QuerySeparator(value = " AND ")
     final case object OR extends QuerySeparator(value = " OR ")
     final case object SPACE extends QuerySeparator(value = " ")
     final case object EMPTY extends QuerySeparator(value = "")
   }
 }

 // main class
 case class IgniteSqlQuery(sqlTemplate: String, args: List[Any]) {

   // all 'append' and 'prepend' methods return a copy of the object prioritizing thread-safety
   def appendSql(sqlTemplate: String, sep: QuerySeparator = QuerySeparator.EMPTY): IgniteSqlQuery = {...}
   def prependSql(sqlTemplate: String, sep: QuerySeparator = QuerySeparator.EMPTY): IgniteSqlQuery = {...}
   def appendArgs(args: List[Any]): IgniteSqlQuery = {...}
   def appendQuery(query: IgniteSqlQuery, sep: QuerySeparator = QuerySeparator.EMPTY): IgniteSqlQuery = {...}

   def isEmpty: Boolean = this.sqlTemplate.isEmpty && this.args.isEmpty

   // builds the actual Ignite SQL query
   def buildFieldsQuery(): SqlFieldsQuery = new SqlFieldsQuery(sqlTemplate).setArgs(args.toArray: _*)
 }`;

const usageExample1 = `def findItems(filterSql: IgniteSqlQuery, sortSql: IgniteSqlQuery, rowCount: Int, startIndex: Long): Iterator[Item] = {
     val whereClause = if (filterSql.isEmpty) filterSql else filterSql.prependSql("WHERE", QuerySeparator.SPACE)
     val orderByClause = if (sortSql.isEmpty) IgniteSqlQuery("ORDER BY id") 
                         else sortSql.prependSql("ORDER BY", QuerySeparator.SPACE)
     val limitAndOffsetClause = IgniteSqlQuery("limit ? offset ?", List(rowCount, startIndex))

     val query = IgniteSqlQuery("SELECT * FROM ItemTable")
       .appendQuery(whereClause, QuerySeparator.SPACE)
       .appendQuery(orderByClause, QuerySeparator.SPACE)
       .appendQuery(limitAndOffsetClause, QuerySeparator.SPACE)

    igniteCache.query(query.buildFieldsQuery())
}`;
