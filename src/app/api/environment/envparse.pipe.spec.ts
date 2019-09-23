import { EnvparsePipe } from './envparse.pipe';

describe('EnvparsePipe', () => {
  it('create an instance', () => {
    const pipe = new EnvparsePipe();
    expect(pipe).toBeTruthy();
  });
});
