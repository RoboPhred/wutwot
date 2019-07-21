import { provides } from "microinject";
import { merge } from "lodash";

import { ControllerMetadataKey, ControllerMethodsMetadataKey } from "./symbols";
import { Controller } from "./services";

export interface ControllerMetadata {
  path: string;
}

export interface ControllerMethodMetadata {
  method: string;
  args?: ControllerMethodArgMetadata[];
  status?: number;
}
export interface ControllerMethodArgMetadata {
  param?: string;
  body?: boolean;
}

export function controller<TFunction extends Function>(
  path: string
): (target: TFunction) => void {
  return function(target: any) {
    provides(Controller)(target);

    const metadata: ControllerMetadata = {
      path
    };
    target[ControllerMetadataKey] = metadata;
  };
}

export function get(): (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    mergeMethodMetadata(target, propertyKey, {
      method: "get"
    });
  };
}

export function post(): (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    mergeMethodMetadata(target, propertyKey, {
      method: "post"
    });
  };
}

export function status(
  code: number
): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    mergeMethodMetadata(target, propertyKey, {
      status: code
    });
  };
}

export function param(
  name: string
): (target: any, propertyKey: string, parameterIndex: number) => void {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    const args: ControllerMethodArgMetadata[] = [];
    args[parameterIndex] = {
      param: name
    };
    mergeMethodMetadata(target, propertyKey, {
      args
    });
  };
}

export function body(): (
  target: any,
  propertyKey: string,
  parameterIndex: number
) => void {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    const args: ControllerMethodArgMetadata[] = [];
    args[parameterIndex] = {
      body: true
    };
    mergeMethodMetadata(target, propertyKey, {
      args
    });
  };
}

function mergeMethodMetadata(
  target: any,
  propertyKey: string,
  mergeData: Partial<ControllerMethodMetadata>
) {
  let methods = target[ControllerMethodsMetadataKey];
  if (!methods) {
    methods = {};
    target[ControllerMethodsMetadataKey] = methods;
  }
  let metadata = methods[propertyKey] || {};
  metadata = merge(metadata, mergeData);
  methods[propertyKey] = metadata;
}

function createOrUpdateArray<T>(
  array: T[] | null | undefined,
  index: number,
  value: T
): T[] {
  if (!array) {
    array = [];
  }
  array[index] = value;
  return array;
}
