import { ContextMenuItem } from "@/components/ui/context-menu"
import { t } from "i18next"
import { Copy, Trash } from "lucide-react"
import { ApNode, ApNodeType } from "../types";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BuilderState } from "../../builder-hooks";
import { ActionType, AddActionRequest, FlowOperationType, flowStructureUtil, StepLocationRelativeToParent, TriggerType, removeAnySubsequentAction, Action } from "@activepieces/shared";
import { INTERNAL_ERROR_TOAST, toast } from "@/components/ui/use-toast";

type CanvasContextMenuContentProps = Pick<BuilderState, 'applyOperation' | 'selectedStep' | 'flowVersion' | 'exitStepSettings'> & {
    selectedNodes: ApNode[]
};


const CanvasContextMenuItemWrapper = ({ showTooltip, children }: { showTooltip: boolean, children: React.ReactNode }) => {
    return <Tooltip >
        <TooltipTrigger asChild>
            <div>
                {children}

            </div>
        </TooltipTrigger>
        {
            showTooltip && <TooltipContent>
                {t("You need to select a step")}
            </TooltipContent>
        }
    </Tooltip>
}


export const CanvasContextMenuContent = ({ selectedNodes, applyOperation, selectedStep, flowVersion, exitStepSettings }: CanvasContextMenuContentProps) => {
    const disabled = selectedNodes.length === 0;
    return <>
     <CanvasContextMenuItemWrapper showTooltip={disabled}>
        <ContextMenuItem disabled={disabled} onClick={() => {
            console.log(flowVersion.trigger)
         const operationsToCopy = selectedNodes.map(node => {
            if (node.type === ApNodeType.STEP && 
                node.data.step.type !== TriggerType.EMPTY && 
                node.data.step.type !== TriggerType.PIECE) {
                const pathToStep = flowStructureUtil
                .findPathToStep(flowVersion.trigger, node.data.step.name);
                const firstPreviousAction = 
                pathToStep.reverse() 
                    .find(s => {
                        return selectedNodes.findIndex(n => 
                            n.type === ApNodeType.STEP && 
                            n.data.step.name === s.name && 
                            n.data.step.type !== TriggerType.EMPTY && 
                            n.data.step.type !== TriggerType.PIECE
                        ) > -1;
                    });
                const stepWithRecentChanges = flowStructureUtil.getStepOrThrow(node.data.step.name ,flowVersion.trigger) as Action;
                const stepWithoutChildren = removeAnySubsequentAction(stepWithRecentChanges);
                if (firstPreviousAction) {
                    const isPreviousStepTheParent = flowStructureUtil.isChildOf(
                        firstPreviousAction, 
                        node.data.step.name
                    );
                
                    if (isPreviousStepTheParent) {
                        const branchIndex = firstPreviousAction.type !== ActionType.ROUTER 
                            ? undefined 
                            : firstPreviousAction.children.findIndex(c => 
                                c ? flowStructureUtil.isChildOf(c, node.data.step.name) || 
                                    c.name === node.data.step.name 
                                  : false
                            );

                        const addOperation: AddActionRequest = {
                            action: stepWithoutChildren,
                            parentStep: firstPreviousAction.name,
                            stepLocationRelativeToParent: firstPreviousAction.type === ActionType.LOOP_ON_ITEMS 
                                ? StepLocationRelativeToParent.INSIDE_LOOP 
                                : StepLocationRelativeToParent.INSIDE_BRANCH,
                            branchIndex
                        };
                        return addOperation;
                    } else {
                        const addOperation: AddActionRequest = {
                            action:stepWithoutChildren,
                            parentStep: firstPreviousAction.name,
                            stepLocationRelativeToParent: StepLocationRelativeToParent.AFTER
                        };
                        return addOperation;
                    }
                }
                const addOperation: AddActionRequest = {
                    action: stepWithoutChildren,
                    parentStep: '',
                    stepLocationRelativeToParent: StepLocationRelativeToParent.AFTER
                };
                return addOperation;
            }
        }).filter(operation => operation !== undefined);
        navigator.clipboard.writeText(JSON.stringify(operationsToCopy));
        }}>
            <div className="flex gap-2 items-center">
                <Copy className="w-4 h-4"></Copy> {t('Copy')}
            </div>
        </ContextMenuItem>
    </CanvasContextMenuItemWrapper>

    <CanvasContextMenuItemWrapper showTooltip={disabled}>
        
        <ContextMenuItem disabled={disabled} onClick={() => {
            selectedNodes.forEach(node => {
                if ('step' in node.data) {
                    applyOperation({
                        type: FlowOperationType.DELETE_ACTION,
                        request: {
                            name: node.data.step.name
                        }
                    }, () => {
                        toast(INTERNAL_ERROR_TOAST);
                    })
                    if (selectedStep === node.data.step.name) {
                        exitStepSettings()
                    }
                }
            })
        }}>
            <div className="flex gap-2 items-center text-destructive">
                <Trash className="w-4 stroke-destructive h-4"></Trash> {t('Delete')}
            </div>
        </ContextMenuItem>
    </CanvasContextMenuItemWrapper></>
}