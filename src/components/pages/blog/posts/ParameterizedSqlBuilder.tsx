import React from 'react';
import { dracula } from 'react-code-blocks';
import { InlineCode } from './common/InlineCode';
import { Note } from './common/Note';
import { CodeSnippet } from './common/CodeSippet';
import { Icon } from '../../../common/icons/Icon';

export const ParameterizedSqlBuilder: React.FC = () => {
  return (
    <>
      <p>
        While working as a full-stack developer for VUU, a UBS open-source
        project, I identified an issue with how we were converting our dynamic
        sort / filter queries from the UI into SQL for our underlying datasource
        to understand. Raised the issue with the team, explained to them how the
        way we are building the query could lead to SQL injection attacks and
        provided suggestions on how we can use a parameterized builder to
        mitigate this threat.
      </p>
      <p>
        In this post, I will be breifly outlining the pattern I used and how it
        helped us achieve a clean and extendable design.
      </p>
      <p>Here is the main class of the parameterized SQL builder:</p>
      <CodeSnippet
        text={igniteSQLQueryClass}
        language={'scala'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
      />
      <p>And here is one example of how it was used:</p>
      <CodeSnippet
        text={usages}
        language={'scala'}
        showLineNumbers={true}
        startingLineNumber={1}
        theme={dracula}
      />
      <Note style={{ marginTop: 0 }}>
        * To view the full merge request:{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/finos/vuu/pull/1319"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          !1319 <Icon name="open-link" />
        </a>
      </Note>
      <p>
        Key design principles and philosophy that ensured thread-safety,
        ease-of-use and extensibility:
        <ul>
          <li>
            Each <InlineCode>append</InlineCode> and{' '}
            <InlineCode>prepend</InlineCode> method returns a copy, prioritizing
            immutability and thread-safety.
          </li>
          <li>
            The initial implementation only catered for{' '}
            <InlineCode>Ignite</InlineCode>, but can easily be extended to
            support additional data sources by adding a new datasource specific{' '}
            <InlineCode>build</InlineCode> method.
          </li>
          <li>
            Various ways to build a query through static constructors and
            various append/prepend builder methods.
          </li>
          <li>
            <InlineCode>QuerySeparator</InlineCode> enum ensured strong type
            while helping users to easily view the supported separators.
          </li>
        </ul>
      </p>
      <p>
        This is all that I wanted to talk about today! Hopefully, now whenever
        you or your team are in a similar situation, you can utilize the same
        design philosophy to implement a solution that is extendable, secure and
        easy to use.
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

const usages = `def findItems(filterSql: IgniteSqlQuery, sortSql: IgniteSqlQuery, rowCount: Int, startIndex: Long): Iterator[Item] = {
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
