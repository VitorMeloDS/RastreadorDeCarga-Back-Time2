it('Teste geração de código para a carga', () => {
  const code: any[] = [];
  const letter: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const num: number[] = [0, 1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9];

  for (let index = 0; index <= 6; index++) {
    if (index < 3) code.push(letter[Math.floor((Math.random() * letter.length))]);
    if (index > 3) code.push(num[Math.floor((Math.random() * num.length))]);
  }

  expect(code).toHaveLength(6);
});
