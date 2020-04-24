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
 * An Interaction Affordance that exposes state of the Thing. This state can then be retrieved (read) and optionally updated (write). Things can also choose to make Properties observable by pushing the new state after a change.
 *
 * This type defines all subclasses based on type.
 *
 * For the cannonical PropertyAffordance W3C WOT type, see {@link PropertyAffordanceBase}.
 * {@link https://w3c.github.io/wot-thing-description/#propertyaffordance}
 */
export type PropertyAffordance =
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
export type ArrayPropertyAffordance = ArraySchema & PropertyAffordanceBase;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link BooleanSchema} subclass of {@link DataSchemaBase}.
 */
export type BooleanPropertyAffordance = BooleanSchema & PropertyAffordanceBase;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link NumberSchema} subclass of {@link DataSchemaBase}.
 */
export type NumberPropertyAffordance = NumberSchema & PropertyAffordanceBase;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link IntegerSchema} subclass of {@link DataSchemaBase}.
 */
export type IntegerPropertyAffordance = IntegerSchema & PropertyAffordanceBase;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link ObjectSchema} subclass of {@link DataSchemaBase}.
 */
export type ObjectPropertyAffordance = ObjectSchema & PropertyAffordanceBase;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link StringSchema} subclass of {@link DataSchemaBase}.
 */
export type StringPropertyAffordance = StringSchema & PropertyAffordanceBase;

/**
 * A {@link PropertyAffordanceBase} implementing the {@link NullSchema} subclass of {@link DataSchemaBase}.
 */
export type NullPropertyAffordance = NullSchema & PropertyAffordanceBase;

/**
 * An Interaction Affordance that exposes state of the Thing. This state can then be retrieved (read) and optionally updated (write). Things can also choose to make Properties observable by pushing the new state after a change.
 */
export interface PropertyAffordanceBase extends InteractionAffordance {
  /**
   * 	A hint that indicates whether Servients hosting the Thing and Intermediaries should provide a Protocol Binding that supports the observeproperty operation for this Property.
   */
  observable?: boolean;
}
