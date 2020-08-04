namespace RealMix.Common.Constants
{
    public class DbConstants
    {
        public static string TablePrefix { get; } = string.Empty;
        public static string SchemaName { get; } = "public";
        public static string UserTableName { get; } = TablePrefix + "user";
        public static string WidgetTableName { get; } = TablePrefix + "widget";
        public static string UserWidgetTableName { get; } = TablePrefix + "userwidget";
        public static string CompanyTableName { get; } = TablePrefix + "company";
        public static string DocumentTableName { get; } = TablePrefix + "document";

        public static string CompanyDocumentTableName { get; } = TablePrefix + "company_document";
    }
}
