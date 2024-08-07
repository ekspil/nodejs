// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	// @ts-expect-error prettier
	eslintConfigPrettier,
	{
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'no-undef': 'error',
		},
	},
	{
		ignores: ['dist/*', '.vscode/*', 'node_modules/*'],
	}
)
