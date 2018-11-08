export interface Inputs {
    checkoutURL: string;
    stepRepoName: string;
    steps: Array<StepInfo>;
    destination: string;
    mode: MODE;
}

export interface StepInfo {
    id?: string;
    path?: string;
    type: IDORPATH;
}

export enum IDORPATH {
    PATH = 'path',
    ID = 'id'
}

export enum MODE {
    CONCATENATE_STEPS = 0,
    REBASE_XML = 1
}

export enum TASKREPO {
    TASK = 'TaskRepository.xml',
    STEP = 'TaskRepositorySSL.xml'
}
