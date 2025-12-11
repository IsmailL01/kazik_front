'use client';

import { Box, Flex, Group, Select, SelectProps, Title } from '@mantine/core';
import Image from 'next/image';
import styles from './style.module.scss';
import { useState } from 'react';

// Данные селекта
const languages = [
	{ value: 'pt', label: 'Portuguese', icon: '/Flag_of_Portugal.png' },
	{ value: 'es', label: 'Spanish', icon: '/Flag_of_Spain.png' },
	{ value: 'us', label: 'English', icon: '/Flag_of_the_United_States.png' },
];

// Опции (кастомный рендер с иконкой)
const renderSelectOption: SelectProps['renderOption'] = ({ option }) => {
	const lang = languages.find((l) => l.value === option.value);

	return (
		<Group gap='xs'>
			<Image
				src={lang?.icon || ''}
				alt={lang?.label || 'flag'}
				width={28}
				height={20}
			/>
		</Group>
	);
};

const PublicChat = () => {
	const [currentLang, setCurrentLang] = useState('us');

	const selected = languages.find((l) => l.value === currentLang);

	return (
		<Box className={styles.publicChat}>
			<Flex className={styles.publicChatHeader} justify={'space-between'}>
				<Flex gap={10} className={styles.publicChatHeaderLeft}>
					<Image
						src={'/test-img-public-chat.jpg'}
						alt='test img'
						width={80}
						height={80}
						className={styles['test-img']}
						style={{ height: 80, width: 80 }}
					/>
					<Title fz={18} fw={500} className={styles.publicChatUserName}>
						Dmitry M.
					</Title>
				</Flex>

				{/* --- LANGUAGE SELECT --- */}
				<Flex className={styles.publicChatHeaderRight}>
					<Select
						classNames={{ input: styles.publicChatLanguage }}
						data={languages.map((l) => ({ value: l.value, label: l.label }))}
						renderOption={renderSelectOption}
						value={currentLang}
						leftSectionPointerEvents='none'
						onChange={setCurrentLang}
						leftSection={
							selected && (
								<Image
									src={selected.icon}
									alt={selected.label}
									width={40}
									height={28}
								/>
							)
						}
					/>
				</Flex>
			</Flex>

			<Box></Box>
		</Box>
	);
};

export default PublicChat;
