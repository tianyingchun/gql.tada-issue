import { normalizeLanguages } from './normalizeLanguages';

describe('normalizeLanguages', () => {
  it('should normalize the languages', () => {
    const expectedNormalizedLanguages = [
      {
        name: 'EN',
        fullName: 'English(EN)',
        code: 'en',
      },
      {
        name: 'EN_GB',
        fullName: 'British English(EN_GB)',
        code: 'en_GB',
      },
    ];

    const normalizedLanguages = normalizeLanguages(['en', 'en_GB']);

    expect(normalizedLanguages).toEqual(expectedNormalizedLanguages);
  });
});
