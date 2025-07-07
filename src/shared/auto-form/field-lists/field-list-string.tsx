"use client";

import type React from "react";
import { useState, forwardRef, InputHTMLAttributes } from "react";
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

interface FieldListStringProps {
  label?: string;
  description?: string;
  value?: string[];
  onChange?: (values: string[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  maxItems?: number;
  allowDuplicates?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  required?: boolean;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}

const FieldListString = forwardRef<HTMLDivElement, FieldListStringProps>(
  (
    {
      label,
      description,
      value = [],
      onChange,
      onBlur,
      placeholder = "Entrez une valeur...",
      maxItems,
      allowDuplicates = false,
      disabled = false,
      className,
      name,
      required = false,
      type = "text",
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    const handleAddItem = () => {
      if (!inputValue.trim() || disabled) return;

      if (!allowDuplicates && value.includes(inputValue.trim())) {
        return;
      }

      if (maxItems && value.length >= maxItems) {
        return;
      }

      const newItems = [...value, inputValue.trim()];
      onChange?.(newItems);
      setInputValue("");
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
      if (!editValue.trim() || editingIndex === null || disabled) return;

      if (
        !allowDuplicates &&
        value.includes(editValue.trim()) &&
        value[editingIndex] !== editValue.trim()
      ) {
        return;
      }

      const newItems = [...value];
      newItems[editingIndex] = editValue.trim();
      onChange?.(newItems);
      setEditingIndex(null);
      setEditValue("");
    };

    const handleCancelEdit = () => {
      setEditingIndex(null);
      setEditValue("");
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
      <FormItem className={className}>
        {label && (
          <FormLabel
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
            <div className="flex gap-2">
              <Input
                value={inputValue}
                type={type}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                onKeyPress={(e) => handleKeyPress(e, "add")}
                disabled={
                  disabled || (maxItems ? value.length >= maxItems : false)
                }
                name={name}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddItem}
                disabled={
                  disabled ||
                  !inputValue.trim() ||
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
                          <Input
                            value={editValue}
                            type={type}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, "edit")}
                            className="flex-1 h-7 text-sm"
                            autoFocus
                            disabled={disabled}
                          />
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
                            {item}
                          </span>
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
              </div>
              {!allowDuplicates && <span>Doublons non autorisés</span>}
            </div>
          </div>
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  }
);

FieldListString.displayName = "FieldListString";

export default FieldListString;
