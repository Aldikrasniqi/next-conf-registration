import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const rules = {
	'react/no-unescaped-entities': 'off',
	'@next/next/no-page-custom-font': 'off',
	'react/prop-types': 'off',
	'react/react-in-jsx-scope': 'off',
	'@typescript-eslint/no-unused-vars': 'warn',
	'@typescript-eslint/explicit-module-boundary-types': 'off',
	'@typescript-eslint/no-explicit-any': 'off',
	'no-console': 'warn',
	'jsx-a11y/anchor-is-valid': 'off',
	'react/display-name': 'off',
	'@next/next/no-img-element': 'off',
}

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules,
	},
]

export default eslintConfig
