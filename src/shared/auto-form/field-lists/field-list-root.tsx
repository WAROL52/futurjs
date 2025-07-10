"use client";

import type React from "react";
import { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X, Plus, Edit2, Check, XIcon } from "lucide-react";
import {
  FieldRootProps,
  FieldRootRenderProps,
  getFieldInfo,
} from "../field-scalars/field-root";
import { FieldError } from "react-hook-form";

export type FieldListRootProps = FieldRootRenderProps & {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  convertValue?: (value: any) => any;
  renderInput?: (props: {
    value: any;
    onValueChange: (value: any) => void;
    name: string;
    disabled?: boolean;
    placeholder?: string;
    index: number;
  }) => React.ReactNode;
  renderItem?: (props: FieldRootRenderProps) => React.ReactNode;
};

export function FieldListRoot(props: FieldListRootProps) {
  const {
    fieldSchema,
    form,
    field,
    type,
    convertValue,
    renderInput: RenderInput,
    renderItem: RenderItem,
  } = props;
  const [inputValue, setInputValue] = useState<any>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<any>();
  const allowDuplicates = fieldSchema.meta?.allowDuplicates || true;
  const maxItems = fieldSchema.meta?.maxItems || 10;
  const value = (field.value || []) as string[];
  const { onChange: onChangeValue, onBlur, ref, disabled } = field;

  const onChange = (newValue: string[]) => {
    if (convertValue) {
      newValue = newValue.map(convertValue);
    }
    onChangeValue(newValue);
  };
  const { description, label, name, placeholder, required } = getFieldInfo({
    fieldSchema,
    form,
    field,
  });
  const errors = (form.formState.errors[field.name] || []) as FieldError[];
  const handleAddItem = () => {
    if (disabled) return;

    if (!allowDuplicates && value.includes(inputValue)) {
      return;
    }

    if (maxItems && value.length >= maxItems) {
      return;
    }

    const newItems = [...value, inputValue];
    onChange?.(newItems);
    setInputValue(undefined);
  };

  const handleRemoveItem = (index: number) => {
    if (disabled) return;
    const newItems = value.filter((_, i) => i !== index);
    onChange?.(newItems);
  };

  const handleStartEdit = (index: number) => {
    if (disabled) return;
    setEditingIndex(index);
    setEditValue(value[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null || disabled) return;

    if (
      !allowDuplicates &&
      value.includes(editValue) &&
      value[editingIndex] !== editValue
    ) {
      return;
    }

    const newItems = [...value];
    newItems[editingIndex] = editValue;
    onChange?.(newItems);
    setEditingIndex(null);
    setEditValue(undefined);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue(undefined);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: "add" | "edit") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (action === "add") {
        handleAddItem();
      } else {
        handleSaveEdit();
      }
    }
  };

  return (
    <FormItem>
      {label && (
        <FormLabel
          htmlFor={field.name}
          className={
            required
              ? "after:content-['*'] after:ml-0.5 after:text-red-500"
              : ""
          }
        >
          {label}
        </FormLabel>
      )}
      <FormControl>
        <div ref={ref} className="space-y-3" onBlur={onBlur}>
          {/* Zone d'ajout */}
          <div className="flex gap-2 ">
            {RenderInput ? (
              <div className="flex-1">
                <RenderInput
                  value={inputValue}
                  onValueChange={setInputValue}
                  name={name}
                  disabled={disabled}
                  placeholder={placeholder}
                  index={value.length}
                />
              </div>
            ) : (
              <Input
                value={inputValue ?? ""}
                id={field.name}
                onChange={(e) =>
                  e.target.value.trim() === ""
                    ? setInputValue(undefined)
                    : setInputValue(e.target.value.trim())
                }
                placeholder={placeholder}
                onKeyPress={(e) =>
                  inputValue?.trim() && handleKeyPress(e, "add")
                }
                disabled={
                  disabled || (maxItems ? value.length >= maxItems : false)
                }
                name={name}
                className="flex-1"
                type={type}
              />
            )}
            <Button
              type="button"
              onClick={handleAddItem}
              disabled={
                disabled ||
                typeof inputValue === "undefined" ||
                (maxItems ? value.length >= maxItems : false)
              }
              size="icon"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Liste des éléments */}
          {value.length > 0 && (
            <div className="px-2">
              <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-2 bg-muted/20">
                {value.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-1.5 border rounded bg-background"
                  >
                    {editingIndex === index ? (
                      <>
                        {RenderInput ? (
                          <RenderInput
                            value={editValue}
                            onValueChange={setEditValue}
                            name={name}
                            disabled={disabled}
                            placeholder={placeholder}
                            index={index}
                          />
                        ) : (
                          <Input
                            value={editValue ?? ""}
                            onChange={(e) =>
                              e.target.value.trim()
                                ? setEditValue(e.target.value.trim())
                                : setEditValue(editValue)
                            }
                            onKeyPress={(e) =>
                              editValue?.trim() && handleKeyPress(e, "edit")
                            }
                            className="flex-1 h-7 text-sm"
                            autoFocus
                            disabled={disabled}
                            type={type}
                          />
                        )}
                        <Button
                          type="button"
                          onClick={handleSaveEdit}
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-green-600 hover:text-green-700"
                          disabled={disabled}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          onClick={handleCancelEdit}
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-gray-600 hover:text-gray-700"
                          disabled={disabled}
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-sm truncate px-1">
                          {RenderItem ? (
                            <RenderItem
                              field={field}
                              fieldSchema={fieldSchema}
                              form={form}
                            />
                          ) : (
                            String(item)
                          )}
                        </span>
                        {errors?.[index] && (
                          <div>
                            <span className="text-red-500 text-xs">
                              {errors?.[index]?.message}
                            </span>
                          </div>
                        )}
                        <Button
                          type="button"
                          onClick={() => handleStartEdit(index)}
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-blue-600 hover:text-blue-700"
                          disabled={disabled}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-600 hover:text-red-700"
                          disabled={disabled}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informations complémentaires */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {value.length}
                {maxItems ? `/${maxItems}` : ""}
              </Badge>
              {maxItems && value.length >= maxItems && (
                <span className="text-amber-600">Limite atteinte</span>
              )}
              <FormMessage />
            </div>
            {!allowDuplicates && <span>Doublons non autorisés</span>}
          </div>
        </div>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
}
