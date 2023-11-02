import { FunctionMetadata } from './function-metadata';

export interface FunctionsMetadataProvider {
  getMetadata(): FunctionMetadata[];
}
