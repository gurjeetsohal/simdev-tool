export interface Inputs {
    checkoutURL: string;
    stepRepoName: string;
    steps: Array<StepInfo>;
    destination: string;
    mode: 1;
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

export enum TASKREPO {
    TASK = 'TaskRepository.xml',
    STEP = 'TaskRepositorySSL.xml'
}
