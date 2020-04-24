import { InteractionAffordance } from "./interaction-affordance";
import {
  ArraySchema,
  BooleanSchema,
  NumberSchema,
  IntegerSchema,
  ObjectSchema,
  StringSchema,
  NullSchema,
} from "./data-schema";

/**
 * A {@link PropertyAffordance} or {@link PropertyAffordanceSubclass}, discriminated by the type property.
 */
export type TypedPropertyAffordance =
  | PropertyAffordance
  | PropertyAffordanceSubclass;

/**
 * A subclass type of {@link PropertyAffordance}
 */
export type PropertyAffordanceSubclass =
  | ArrayPropertyAffordance
  | BooleanPropertyAffordance
  | NumberPropertyAffordance
  | IntegerPropertyAffordance
  | ObjectPropertyAffordance
  | StringPropertyAffordance
  | NullPropertyAffordance;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link ArraySchema} subclass of {@link DataSchemaBase}.
 */
export type ArrayPropertyAffordance = ArraySchema & PropertyAffordance;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link BooleanSchema} subclass of {@link DataSchemaBase}.
 */
export type BooleanPropertyAffordance = BooleanSchema & PropertyAffordance;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link NumberSchema} subclass of {@link DataSchemaBase}.
 */
export type NumberPropertyAffordance = NumberSchema & PropertyAffordance;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link IntegerSchema} subclass of {@link DataSchemaBase}.
 */
export type IntegerPropertyAffordance = IntegerSchema & PropertyAffordance;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link ObjectSchema} subclass of {@link DataSchemaBase}.
 */
export type ObjectPropertyAffordance = ObjectSchema & PropertyAffordance;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link StringSchema} subclass of {@link DataSchemaBase}.
 */
export type StringPropertyAffordance = StringSchema & PropertyAffordance;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link NullSchema} subclass of {@link DataSchemaBase}.
 */
export type NullPropertyAffordance = NullSchema & PropertyAffordance;

/**
 * An Interaction Affordance that exposes state of the Thing. This state can then be retrieved (read) and optionally updated (write). Things can also choose to make Properties observable by pushing the new state after a change.
 * {@link https://w3c.github.io/wot-thing-description/#propertyaffordance}
 */
export interface PropertyAffordance extends InteractionAffordance {
  /**
   * 	A hint that indicates whether Servients hosting the Thing and Intermediaries should provide a Protocol Binding that supports the observeproperty operation for this Property.
   */
  observable?: boolean;
}
