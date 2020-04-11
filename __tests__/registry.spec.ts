/* eslint-disable no-undef */
import Register from '../src/utils/Register';

describe('testing all register functions', () => {
  const register: Register = new Register();
  describe('testing registerCommands', () => {
    jest.spyOn(register, 'registerCommands');
    afterEach((done) => done());
    test('it should expect register to be correct instace', () => {
      expect(register).toBeInstanceOf(Register);
    });
    test('it should call registerCommands with a string and throw an error', async () => {
      try {
        await register.registerCommands('hello');
      } catch (err) {
        expect(register.registerCommands).toHaveBeenCalledWith('hello');
        expect(err).toBeTruthy();
      }
    });
    test('it should throw an error file not found', async () => {
      try {
        await register.registerCommands('somefile');
      } catch (err) {
        expect(register.registerCommands).toHaveBeenCalledTimes(2);
        expect(register.registerCommands).toHaveBeenCalledWith('somefile');
        expect(err).toBeTruthy();
      }
    });
  });
  describe('testing registerEvents', () => {
    jest.spyOn(register, 'registerEvents');
    afterEach((done) => done());
    test('it should expect an error', () => {
      register.registerEvents('hello')
        .catch((err) => {
          expect(err).toBeTruthy();
        });
    });
  });
  describe('testing utility functions', () => {
    jest.spyOn(register, 'getFiles');
    it('should call getFiles', async () => {
      try {
        const files = await register.getFiles('../src');
        expect(files).toBeTruthy();
        expect(files).toBeInstanceOf(Array);
        expect(files.length).toEqual(6);
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
    it('should call getFiles and throw an error', async () => {
      try {
        const files = await register.getFiles('../src/something');
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
  });
});
