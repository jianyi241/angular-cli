/**
 * SelectionCondition
 */
export class SelectionCondition {
    analyseId?: string;
    comparisonId?: string;
    essential?: boolean;
    id?: string;
    /**
     * select: true, deselect: false
     */
    selectFlag?: boolean;
    /**
     * group, property
     */
    selectionType?: string;
    tabType?: number;
}
