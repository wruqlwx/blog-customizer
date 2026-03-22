const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const { execSync } = require('child_process');

try {
	console.log('--- ПРИНУДИТЕЛЬНАЯ УСТАНОВКА PLAYWRIGHT ---');
	execSync('npx playwright install chromium', { stdio: 'inherit' });
} catch (e) {
	console.warn('--- НЕ УДАЛОСЬ УСТАНОВИТЬ БРАУЗЕР (ОШИБКА ИГНОРИРУЕТСЯ) ---');
}

module.exports = (envVars) => {
	const { env } = envVars;
	const envConfig = require(`./webpack.${env}.js`);
	const config = merge(commonConfig, envConfig);
	return config;
};
