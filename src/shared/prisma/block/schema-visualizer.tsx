"use client";

import { useCallback, useMemo, useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  BackgroundVariant,
  Edge,
  Node,
  Handle,
  Position,
  NodeProps,
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { RiAddLine, RiSubtractLine, RiFullscreenLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { RiMore2Fill } from "@remixicon/react";
import { cn } from "@/lib/utils";

// Register custom node types and edge types

const edgeTypes = {
  custom: SchemaEdge,
};

export type SchemaVisualizerProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

export function SchemaVisualizerInner({
  initialNodes,
  initialEdges,
}: SchemaVisualizerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const onFitView = useCallback(() => {
    fitView({ padding: 0.2 });
  }, [fitView]);
  const TableNode = useCallback(
    function TableNode({ data, id }: NodeProps<TableNodeType>) {
      // Find all source connections for this node
      const sourceConnections = initialEdges
        .filter((edge) => edge.source === id)
        .map((edge) => edge.sourceHandle);

      // Find all target connections for this node
      const targetConnections = initialEdges
        .filter((edge) => edge.target === id)
        .map((edge) => edge.targetHandle);

      return (
        <div
          className={cn(
            "rounded-xl bg-card shadow-[0_1px_1px_rgba(0,0,0,0.02),_0_2px_2px_rgba(0,0,0,0.02),_0_4px_4px_rgba(0,0,0,0.02),_0_8px_8px_rgba(0,0,0,0.02),_0_16px_16px_rgba(0,0,0,0.02),_0_32px_32px_rgba(0,0,0,0.02)] w-66 font-mono",
            data.selected ? "ring-2 ring-primary ring-offset-2" : ""
          )}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-gradient-to-t from-background/70 dark:from-background/30">
            <div className="text-[13px]">
              <span className="text-muted-foreground/80">/</span>{" "}
              <span className="font-medium">{data.label}</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none hover:bg-transparent -my-2 -me-2 text-muted-foreground/60 hover:text-muted-foreground"
              aria-label="Open edit menu"
            >
              <RiMore2Fill className="size-5" aria-hidden="true" />
            </Button>
          </div>
          <div className="text-xs py-2">
            {data.fields.map((field: TableField) => (
              <div key={field.name} className="px-4 relative group">
                <div className="flex items-center justify-between gap-2 py-2 border-dashed group-not-last:border-b">
                  <span className="truncate font-medium">{field.name}</span>
                  <span className="text-muted-foreground/60">{field.type}</span>

                  {/* Field handles */}
                  {((field.isPrimary &&
                    sourceConnections.includes(field.name)) ||
                    (field.isForeign &&
                      targetConnections.includes(field.name))) && (
                    <Handle
                      type={field.isPrimary ? "source" : "target"}
                      position={
                        field.isPrimary ? Position.Left : Position.Right
                      }
                      id={field.name}
                      className="size-2.5 rounded-full bg-foreground! border-2 border-background"
                      isConnectable={false}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },
    [initialEdges]
  );
  const { nodeTypes } = useMemo(() => {
    return {
      nodeTypes: {
        tableNode: TableNode,
      },
    };
  }, [TableNode]);
  return (
    <main className="flex-1 flex items-stretch">
      <div className="w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.5}
          maxZoom={1}
          defaultEdgeOptions={{
            type: "custom",
            className: "opacity-25",
          }}
          style={
            {
              "--xy-background-pattern-dots-color-default":
                "var(--color-border)",
              "--xy-edge-stroke-width-default": 1.5,
              "--xy-edge-stroke-default": "var(--color-foreground)",
              "--xy-edge-stroke-selected-default": "var(--color-foreground)",
              "--xy-attribution-background-color-default": "transparent",
            } as React.CSSProperties
          }
          attributionPosition="bottom-left"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={2} />

          <Panel
            position="bottom-right"
            className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
          >
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={() => zoomIn()}
              aria-label="Zoom in"
            >
              <RiAddLine className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={() => zoomOut()}
              aria-label="Zoom out"
            >
              <RiSubtractLine className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={onFitView}
              aria-label="Fit view"
            >
              <RiFullscreenLine className="size-5" aria-hidden="true" />
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </main>
  );
}

export function SchemaVisualizer(props: SchemaVisualizerProps) {
  return (
    <ReactFlowProvider>
      <SchemaVisualizerInner {...props} />
    </ReactFlowProvider>
  );
}

function SchemaEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: sourcePosition || Position.Bottom,
    targetX,
    targetY,
    targetPosition: targetPosition || Position.Top,
    borderRadius: 8, // Increased border radius for smoother corners
  });

  return <BaseEdge path={edgePath} style={style} markerEnd={markerEnd} />;
}

export interface TableField {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
}

interface TableNodeData extends Record<string, unknown> {
  label: string;
  fields: TableField[];
  selected?: boolean;
}

type TableNodeType = Node<TableNodeData, "tableNode">;
