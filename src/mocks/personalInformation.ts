export interface PersonalInformation {
  name: string;
  age: number;
  birthday: Date;
  employed: boolean;
  hobbies: string[];
  languages: { [language: string]: string };
  favoriteColor: string;
}

export const personalInformation = {
  name: 'John',
  age: 25,
  employed: true,
  favoriteColor: '#eee',
  hobbies: ['Running', 'Reading'],
  languages: {
    english: 'Mother Language',
    german: 'Proficient',
  },
  birthday: new Date('Jan 1 1994'),
};
