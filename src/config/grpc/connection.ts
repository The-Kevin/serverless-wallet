import path from 'path';
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.resolve(
  __dirname,
  '..',
  '..',
  'modules',
  'transactions',
  'utils',
  'Transaction.proto',
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

module.exports = packageDefinition;
