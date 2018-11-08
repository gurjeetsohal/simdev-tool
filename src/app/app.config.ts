import { IUserData } from './modules/core/models/user-data.model';

export const AppConfig = {
    urls: {
        balooTaskUrl: 'https://baloo.prd-prsn.com/#!/content/task/',
        balooHomeUrl: 'https://baloo.prd-prsn.com/#!/',
        compSpecUrl: 'https://myitlabgrader.atlassian.net/wiki/spaces/SIM2019/pages/361431041/Component+Specification+Documents',
        controlSpecUrl: 'https://myitlabgrader.atlassian.net/wiki/spaces/SIM2019/pages/571736065/Controls',
        bitBucketUrl: 'https://bitbucket.pearson.com/projects/SIMS',
        jiraUrl: 'https://myitlabgrader.atlassian.net/browse/',
        gitServerUrl: 'http://gitserver.comprotechnologies.com/scm/'

    },
    appinfo: {
        title: 'SIM5-DevTools blaaaaaaaaaaaaaaaaaaaaahhhhhh'
    },
    XMLsPathFromSim5Service: '\\XMLs\\',
    taskRepos: {
        TaskRepoSSL: 'TaskRepositorySSL.xml',
        TaskRepo13_16: 'TaskRepository.xml',
        TaskRepo2019:  'TaskRepository2019.xml',
    },
};

export enum SIM5AppsName {
    XL = 'Excel',
    PPT = 'PPT',
    WD = 'Word',
    AC = 'Access',
}

export enum UserData {
    SIM5SERVICE_PATH = 'sim5servicePath',
    SIM5LAUNCH_URL = 'sim5LaunchUrl'
}

export const DefaultUserSettings: IUserData = {
    sim5LaunchUrl: {
        value: 'http://localhost/sims/'
    },
    sim5servicePath: {
        value: 'D:\\SIM_GIT\\trunk\\Modules\\sim5service',
    }
};

