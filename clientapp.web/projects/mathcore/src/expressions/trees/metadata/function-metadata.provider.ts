import { FunctionMetadata } from './function-metadata';

export interface FunctionMetadataProvider {
  getMetadata(functionType: Function): FunctionMetadata;
}
