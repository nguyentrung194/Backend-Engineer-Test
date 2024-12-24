import { ColumnType } from 'typeorm';

const PrimaryGenColType = {
  INT: 'int' as ColumnType,
  INT2: 'int2' as ColumnType,
  INT4: 'int4' as ColumnType,
  INT8: 'int8' as ColumnType,
  INTEGER: 'integer' as ColumnType,
  TINYINT: 'tinyint' as ColumnType,
  SMALLINT: 'smallint' as ColumnType,
  MEDIUMINT: 'mediumint' as ColumnType,
  BIGINT: 'bigint' as ColumnType,
  DEC: 'dec' as ColumnType,
  DECIMAL: 'decimal' as ColumnType,
  SMALLDECIMAL: 'smalldecimal' as ColumnType,
  FIXED: 'fixed' as ColumnType,
  NUMERIC: 'numeric' as ColumnType,
  NUMBER: 'number' as ColumnType,
};

const SpatialColType = {
  GEOMETRY: 'geometry' as ColumnType,
  GEOGRAPHY: 'geography' as ColumnType,
  ST_GEOMETRY: 'st_geometry' as ColumnType,
  ST_POINT: 'st_point' as ColumnType,
};

const WithPrecisionColType = {
  FLOAT: 'float' as ColumnType,
  DOUBLE: 'double' as ColumnType,
  DEC: 'dec' as ColumnType,
  DECIMAL: 'decimal' as ColumnType,
  SMALLDECIMAL: 'smalldecimal' as ColumnType,
  FIXED: 'fixed' as ColumnType,
  NUMERIC: 'numeric' as ColumnType,
  REAL: 'real' as ColumnType,
  DOUBLE_PRECISION: 'double precision' as ColumnType,
  NUMBER: 'number' as ColumnType,
  DATETIME: 'datetime' as ColumnType,
  DATETIME2: 'datetime2' as ColumnType,
  DATETIMEOFFSET: 'datetimeoffset' as ColumnType,
  TIME: 'time' as ColumnType,
  TIME_WITH_TIME_ZONE: 'time with time zone' as ColumnType,
  TIME_WITHOUT_TIME_ZONE: 'time without time zone' as ColumnType,
  TIMESTAMP: 'timestamp' as ColumnType,
  TIMESTAMP_WITHOUT_TIME_ZONE: 'timestamp without time zone' as ColumnType,
  TIMESTAMP_WITH_TIME_ZONE: 'timestamp with time zone' as ColumnType,
  TIMESTAMP_WITH_LOCAL_TIME_ZONE:
    'timestamp with local time zone' as ColumnType,
};

const WithLengthColType = {
  CHARACTER_VARYING: 'character varying' as ColumnType,
  VARYING_CHARACTER: 'varying character' as ColumnType,
  CHAR_VARYING: 'char varying' as ColumnType,
  NVARCHAR: 'nvarchar' as ColumnType,
  NATIONAL_VARCHAR: 'national varchar' as ColumnType,
  CHARACTER: 'character' as ColumnType,
  NATIVE_CHARACTER: 'native character' as ColumnType,
  VARCHAR: 'varchar' as ColumnType,
  CHAR: 'char' as ColumnType,
  NCHAR: 'nchar' as ColumnType,
  NATIONAL_CHAR: 'national char' as ColumnType,
  VARCHAR2: 'varchar2' as ColumnType,
  NVARCHAR2: 'nvarchar2' as ColumnType,
  ALPHANUM: 'alphanum' as ColumnType,
  SHORTTEXT: 'shorttext' as ColumnType,
  RAW: 'raw' as ColumnType,
  BINARY: 'binary' as ColumnType,
  VARBINARY: 'varbinary' as ColumnType,
  STRING: 'string' as ColumnType,
};

const WithWidthColType = {
  TINYINT: 'tinyint' as ColumnType,
  SMALLINT: 'smallint' as ColumnType,
  MEDIUMINT: 'mediumint' as ColumnType,
  INT: 'int' as ColumnType,
  BIGINT: 'bigint' as ColumnType,
};
/**
 * All other regular column types.
 */
const SimpleColType = {
  SIMPLE_ARRAY: 'simple-array' as ColumnType,
  SIMPLE_JSON: 'simple-json' as ColumnType,
  SIMPLE_ENUM: 'simple-enum' as ColumnType,
  INT2: 'int2' as ColumnType,
  INTEGER: 'integer' as ColumnType,
  INT4: 'int4' as ColumnType,
  INT8: 'int8' as ColumnType,
  INT64: 'int64' as ColumnType,
  UNSIGNED_BIG_INT: 'unsigned big int' as ColumnType,
  FLOAT: 'float' as ColumnType,
  FLOAT4: 'float4' as ColumnType,
  FLOAT8: 'float8' as ColumnType,
  SMALLMONEY: 'smallmoney' as ColumnType,
  MONEY: 'money' as ColumnType,
  BOOLEAN: 'boolean' as ColumnType,
  BOOL: 'bool' as ColumnType,
  TINYBLOB: 'tinyblob' as ColumnType,
  TINYTEXT: 'tinytext' as ColumnType,
  MEDIUMBLOB: 'mediumblob' as ColumnType,
  MEDIUMTEXT: 'mediumtext' as ColumnType,
  BLOB: 'blob' as ColumnType,
  TEXT: 'text' as ColumnType,
  NTEXT: 'ntext' as ColumnType,
  CITEXT: 'citext' as ColumnType,
  HSTORE: 'hstore' as ColumnType,
  LONGBLOB: 'longblob' as ColumnType,
  LONGTEXT: 'longtext' as ColumnType,
  ALPHANUM: 'alphanum' as ColumnType,
  SHORTTEXT: 'shorttext' as ColumnType,
  BYTES: 'bytes' as ColumnType,
  BYTEA: 'bytea' as ColumnType,
  LONG: 'long' as ColumnType,
  RAW: 'raw' as ColumnType,
  LONG_RAW: 'long raw' as ColumnType,
  BFILE: 'bfile' as ColumnType,
  CLOB: 'clob' as ColumnType,
  NCLOB: 'nclob' as ColumnType,
  IMAGE: 'image' as ColumnType,
  TIMETZ: 'timetz' as ColumnType,
  TIMESTAMPTZ: 'timestamptz' as ColumnType,
  TIMESTAMP_WITH_LOCAL_TIME_ZONE:
    'timestamp with local time zone' as ColumnType,
  SMALLDATETIME: 'smalldatetime' as ColumnType,
  DATE: 'date' as ColumnType,
  INTERVAL_YEAR_TO_MONTH: 'interval year to month' as ColumnType,
  INTERVAL_DAY_TO_SECOND: 'interval day to second' as ColumnType,
  INTERVAL: 'interval' as ColumnType,
  YEAR: 'year' as ColumnType,
  SECONDDATE: 'seconddate' as ColumnType,
  POINT: 'point' as ColumnType,
  LINE: 'line' as ColumnType,
  LSEG: 'lseg' as ColumnType,
  BOX: 'box' as ColumnType,
  CIRCLE: 'circle' as ColumnType,
  PATH: 'path' as ColumnType,
  POLYGON: 'polygon' as ColumnType,
  GEOGRAPHY: 'geography' as ColumnType,
  GEOMETRY: 'geometry' as ColumnType,
  LINESTRING: 'linestring' as ColumnType,
  MULTIPOINT: 'multipoint' as ColumnType,
  MULTILINESTRING: 'multilinestring' as ColumnType,
  MULTIPOLYGON: 'multipolygon' as ColumnType,
  GEOMETRYCOLLECTION: 'geometrycollection' as ColumnType,
  ST_GEOMETRY: 'st_geometry' as ColumnType,
  ST_POINT: 'st_point' as ColumnType,
  INT4RANGE: 'int4range' as ColumnType,
  INT8RANGE: 'int8range' as ColumnType,
  NUMRANGE: 'numrange' as ColumnType,
  TSRANGE: 'tsrange' as ColumnType,
  TSTZRANGE: 'tstzrange' as ColumnType,
  DATERANGE: 'daterange' as ColumnType,
  ENUM: 'enum' as ColumnType,
  SET: 'set' as ColumnType,
  CIDR: 'cidr' as ColumnType,
  INET: 'inet' as ColumnType,
  MACADDR: 'macaddr' as ColumnType,
  BIT: 'bit' as ColumnType,
  BIT_VARYING: 'bit varying' as ColumnType,
  VARBIT: 'varbit' as ColumnType,
  TSVECTOR: 'tsvector' as ColumnType,
  TSQUERY: 'tsquery' as ColumnType,
  UUID: 'uuid' as ColumnType,
  XML: 'xml' as ColumnType,
  JSON: 'json' as ColumnType,
  JSONB: 'jsonb' as ColumnType,
  VARBINARY: 'varbinary' as ColumnType,
  HIERARCHYID: 'hierarchyid' as ColumnType,
  SQL_VARIANT: 'sql_variant' as ColumnType,
  ROWID: 'rowid' as ColumnType,
  UROWID: 'urowid' as ColumnType,
  UNIQUEIDENTIFIER: 'uniqueidentifier' as ColumnType,
  ROWVERSION: 'rowversion' as ColumnType,
  ARRAY: 'array' as ColumnType,
  CUBE: 'cube' as ColumnType,
  LTREE: 'ltree' as ColumnType,
};

export const TypeORMColType = {
  ...PrimaryGenColType,
  ...WithPrecisionColType,
  ...WithLengthColType,
  ...WithWidthColType,
  ...SpatialColType,
  ...SimpleColType,
};
