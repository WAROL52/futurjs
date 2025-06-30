"use client";

import React, { useState } from "react";
import {
  createOnDropHandler,
  dragAndDropFeature,
  hotkeysCoreFeature,
  keyboardDragAndDropFeature,
  selectionFeature,
  syncDataLoaderFeature,
} from "@headless-tree/core";
import { AssistiveTreeDescription, useTree } from "@headless-tree/react";
import {
  RiBracesLine,
  RiCodeSSlashLine,
  RiFileLine,
  RiFileTextLine,
  RiImageLine,
  RiReactjsLine,
} from "@remixicon/react";

import { Tree, TreeItem, TreeItemLabel } from "@/components/tree";
import { CodeView } from "@/types";
import { normalizePath } from "@/lib/utils";

interface Item {
  name: string;
  children?: string[];
  fileExtension?: string;
  index: number;
}

// Helper function to get icon based on file extension
function getFileIcon(extension: string | undefined, className: string) {
  switch (extension) {
    case "tsx":
    case "jsx":
      return <RiReactjsLine className={className} />;
    case "ts":
    case "js":
    case "mjs":
      return <RiCodeSSlashLine className={className} />;
    case "json":
      return <RiBracesLine className={className} />;
    case "svg":
    case "ico":
    case "png":
    case "jpg":
      return <RiImageLine className={className} />;
    case "md":
      return <RiFileTextLine className={className} />;
    default:
      return <RiFileLine className={className} />;
  }
}
const rootName = "/root";
function toTree(codes: CodeView[]): Record<string, Item> {
  const items: Record<string, Item> = {
    [rootName]: {
      name: "Project Root",
      children: [],
      index: 0,
    },
  };
  const paths = codes
    .map((code, indexCode) => {
      const parts = normalizePath(code.path)
        .split("/")
        .filter((c) => c);

      parts.map((part, index) => {
        if (index === 0) {
          if (!items[rootName].children) items[rootName].children = [];
          if (!items[rootName].children.includes(part))
            items[rootName].children.push(part);
        }
        const slice = parts.slice(0, index + 1).join("/");
        const parent = parts.slice(0, index).join("/");

        if (!items[slice]) {
          items[slice] = {
            name: part,
            index: indexCode,
          };
        }
        if (items[parent]) {
          if (!items[parent].children) items[parent].children = [];
          if (!items[parent].children.includes(slice)) {
            items[parent].children.push(slice);
          }
        }
        const ext = slice.split(".").at(-1);
        if (parts.length == index + 1 && ext) {
          items[slice].fileExtension = ext;
        }
      });
      return parts;
    })
    .flat();

  return items;
}
const indent = 20;

export type FileTreeProps = {
  codes: CodeView[];
  active: number;
  setActive: (index: number) => void;
};

export function FileTree({ codes, active, setActive }: FileTreeProps) {
  const [items, setItems] = useState(toTree(codes));

  const selectedItems =
    Object.keys(items).find((k) => k === String(codes[active]?.path)) ||
    rootName;
  const tree = useTree<Item>({
    initialState: {
      expandedItems: Object.keys(items),
      selectedItems: [selectedItems],
    },
    state: {
      selectedItems: [selectedItems],
    },
    indent,
    rootItemId: rootName,
    getItemName: (item) => item.getItemData()?.name ?? "Unknown",
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    canReorder: false,
    canDrop: () => false,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId]?.children ?? [],
    },
    features: [
      syncDataLoaderFeature,
      selectionFeature,
      hotkeysCoreFeature,
      dragAndDropFeature,
      keyboardDragAndDropFeature,
    ],
  });

  return (
    <div className="flex h-full flex-col gap-2 *:first:grow">
      <div>
        <Tree
          className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
          indent={indent}
          tree={tree}
        >
          <AssistiveTreeDescription tree={tree} />
          {tree.getItems().map((item) => {
            return (
              <TreeItem key={item.getId()} item={item} className="pb-0!">
                <TreeItemLabel
                  onClick={() => {
                    console.log("CLICKKKKKKKKKK");

                    if (item.getItemData()?.fileExtension) {
                      setActive(item.getItemData().index);
                    }
                  }}
                  className="rounded-none py-1"
                >
                  <span className="flex items-center gap-2">
                    {!item.isFolder() &&
                      getFileIcon(
                        item.getItemData()?.fileExtension,
                        "text-muted-foreground pointer-events-none size-4"
                      )}
                    {item.getItemName()}
                  </span>
                </TreeItemLabel>
              </TreeItem>
            );
          })}
        </Tree>
      </div>
    </div>
  );
}
