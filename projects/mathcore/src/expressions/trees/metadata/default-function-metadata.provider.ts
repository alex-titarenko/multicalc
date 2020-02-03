import { FunctionMetadata } from './function-metadata';
import { FunctionMetadataProvider } from './function-metadata.provider';
import { functionAttribute } from './function.attribute';
import { displayNameAttribute } from './display-name.attribute';
import { categoryAttribute } from './category.attribute';
import { sectionAttribute } from './section.attribute';
import { descriptionAttribute } from './description.attribute';
import { functionSignatureAttribute } from './function-signature.attribute';
import { exampleUsageAttribute } from './example-usage.attribute';

export class DefaultFunctionMetadataProvider implements FunctionMetadataProvider {
  public getMetadata(functionType: Function): FunctionMetadata {
    const functionMetadata = new FunctionMetadata(functionType);

    functionMetadata.name = functionAttribute.getName(functionType);
    if (!functionMetadata.name) {
      throw new Error('Name is required.');
    }

    functionMetadata.displayName = displayNameAttribute.getName(functionType);
    functionMetadata.category = categoryAttribute.getCategory(functionType);
    functionMetadata.section = sectionAttribute.getSection(functionType);
    functionMetadata.description = descriptionAttribute.getDescription(functionType);
    functionMetadata.signatures = functionSignatureAttribute.getSignatures(functionType);
    functionMetadata.exampleUsages = exampleUsageAttribute.getUsages(functionType);

    return functionMetadata;
  }
}
