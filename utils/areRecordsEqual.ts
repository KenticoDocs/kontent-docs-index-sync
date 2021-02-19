import { IRecord } from 'kontent-docs-shared-code';

export const areRecordsEqual = (record1: IRecord, record2: IRecord): boolean =>
    record1.id === record2.id &&
    record1.order === record2.order &&
    record1.title === record2.title &&
    record1.content === record2.content &&
    record1.heading === record2.heading &&
    record1.section === record2.section &&
    record1.codename === record2.codename &&
    record1.objectID === record2.objectID &&
    record1.isCodeSample === record2.isCodeSample &&
    arePlatformsEqual(record1.platforms, record2.platforms);

const arePlatformsEqual = (platforms1: string[] = [], platforms2: string[] = []) => {
    if (platforms1.length !== platforms2.length) {
        return false;
    }

    const sortedPlatforms1 = platforms1.sort();
    const sortedPlatforms2 = platforms2.sort();

    for (let i = 0; i < sortedPlatforms1.length; i++) {
        if (sortedPlatforms1[i] !== sortedPlatforms2[i]) {
            return false;
        }
    }

    return true;
};
