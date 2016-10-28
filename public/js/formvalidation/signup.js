$(document).ready(() => {
	$('form').form({
		on: 'blur',
		inline: true,
		fields: {
			nome: {
				identifier: 'nome',
				rules: [
					{
						type: 'empty',
						prompt: 'Insira um nome válido.',
					},
				],
			},
			endereco: {
				identifier: 'endereco',
				rules: [
					{
						type: 'empty',
						prompt: 'Insira um endereço válido.',
					},
				],
			},
			CPF: {
				identifier: 'CPF',
				rules: [
					{
						type: 'empty',
						prompt: 'Insira um CPF válido.',
					},
					{
						type: 'integer',
						prompt: 'CPF deve conter apenas números.',
					},
					{
						type: 'exactLength[11]',
						prompt: 'CPF deve conter 11 dígitos.',
					},
				],
			},
			telefone: {
				identifier: 'telefone',
				rules: [
					{
						type: 'empty',
						prompt: 'Insira um telefone válido.',
					},
					{
						type: 'integer',
						prompt: 'Telefone deve conter apenas números.',
					},
				],
			},
			email: {
				identifier: 'email',
				rules: [
					{
						type: 'empty',
						prompt: 'Insira um e-mail.',
					},
					{
						type: 'email',
						prompt: 'Insira um e-mail válido.',
					},
				],
			},
			password: {
				identifier: 'password',
				rules: [
					{
						type: 'empty',
						prompt: 'Insira uma senha.',
					},
					{
						type: 'minLength[6]',
						prompt: 'Sua senha deve possuir pelo menos {ruleValue} caracteres.',
					},
				],
			},
			terms: {
				identifier: 'terms',
				rules: [
					{
						type: 'checked',
						prompt: 'Você deve concordar com os termos e condições.',
					},
				],
			},
		},
	});
});
