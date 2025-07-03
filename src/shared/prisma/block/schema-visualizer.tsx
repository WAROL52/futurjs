"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
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
  sourceConnections: string[];
  targetConnections: string[];
}

type TableNodeType = Node<TableNodeData, "tableNode">;

export type SchemaVisualizerProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};
function TableNode({ data, id }: NodeProps<TableNodeType>) {
  console.log({
    id,
    sourceConnections: data.sourceConnections,
    targetConnections: data.targetConnections,
  });

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
        {data.fields.map((field: TableField) => {
          const isPrimaryConnection =
            field.isPrimary && data.sourceConnections.includes(field.name);
          const isForeignConnection =
            field.isForeign && data.targetConnections.includes(field.name);
          return (
            <div key={field.name} className="px-4 relative group">
              <div className="flex items-center justify-between gap-2 py-2 border-dashed group-not-last:border-b">
                <span className="truncate font-medium">
                  {field.isForeign && "⛓️"}
                  {field.isPrimary && "🔑"}
                  {field.name}
                </span>
                <span className="text-muted-foreground/60">
                  {field.type}
                  {isPrimaryConnection && "#"}
                  {isForeignConnection && "@"}
                </span>

                {/* Field handles */}
                {(isPrimaryConnection || isForeignConnection) && (
                  <Handle
                    type={field.isPrimary ? "source" : "target"}
                    position={field.isPrimary ? Position.Left : Position.Right}
                    id={field.name}
                    className="size-2.5 rounded-full bg-foreground! border-2 border-background"
                    isConnectable={false}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const { nodeTypes } = {
  nodeTypes: {
    tableNode: TableNode,
  },
};
export function SchemaVisualizerInner({
  initialNodes,
  initialEdges,
}: SchemaVisualizerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  useEffect(() => setNodes(initialNodes), [initialNodes, setNodes]);
  useEffect(() => setEdges(initialEdges), [initialEdges, setEdges]);

  const onFitView = useCallback(() => {
    fitView({ padding: 0.2 });
  }, [fitView]);

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
  const { initialNodes, initialEdges } = props;

  props.initialNodes.map((node) => {
    if (node.type === "tableNode") {
      const data = node.data as TableNodeData;

      // Find all source connections for this node
      const sourceConnections = initialEdges
        .filter((edge) => edge.source === node.id)
        .map((edge) => edge.sourceHandle);

      // Find all target connections for this node
      const targetConnections = initialEdges
        .filter((edge) => edge.target === node.id)
        .map((edge) => edge.targetHandle);

      data.sourceConnections = sourceConnections as string[];
      data.targetConnections = targetConnections as string[];
    }
  });
  return (
    <ReactFlowProvider>
      <SchemaVisualizerInner
        initialEdges={props.initialEdges}
        initialNodes={props.initialNodes}
      />
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
