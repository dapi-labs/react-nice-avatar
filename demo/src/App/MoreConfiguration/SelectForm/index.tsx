import React, { PropsWithChildren, useMemo } from 'react';
import { defaultOptions } from 'react-nice-avatar/utils';
import { AvatarFullConfig } from 'react-nice-avatar/types';
import Select from './Select';
import Input from './Input';

export interface SelectFormProps {
    style?: React.CSSProperties,
    className?: string,
    seedValue: string,

    lockedAttr?: Array<keyof AvatarFullConfig>,
    onChangeLockedAttr?: (attr: Array<keyof AvatarFullConfig>) => void,

    config: Required<AvatarFullConfig>,
    onChangeSeedValue?: (value: string, lockedAttr: Array<keyof AvatarFullConfig>) => void,
    updateConfig: (type: keyof AvatarFullConfig, value: string) => void,
}

const ignoreList = [
    'gradientBgColor',
    'eyeBrowWoman', 'eyeBrowStyle',
    'hairStyleMan', 'hairStyleWoman'
]

const orderKeyList: Array<keyof AvatarFullConfig> = [
    'sex',
    'faceColor',
    'hairStyle',
    'hairColor',

    'hatStyle',
    'hatColor',

    'eyeStyle',
    'glassesStyle',
    'earSize',
    'noseStyle',
    'mouthStyle',

    'shirtStyle',
    'shirtColor',

    'bgColor',
]

export default function SelectForm({
    config,
    seedValue,
    className,
    style,
    lockedAttr = [],
    onChangeLockedAttr,
    onChangeSeedValue,
    updateConfig
}: PropsWithChildren<SelectFormProps>) {
    const { sex } = config

    const list = useMemo(() => {
        return orderKeyList.map((key) => {

            const item = {
                key: key as keyof AvatarFullConfig,
                label: key,
                items: defaultOptions[key]
            }

            if (key === 'hairStyle') {
                return {
                    ...item,
                    items: sex === 'man' ? defaultOptions.hairStyleMan : defaultOptions.hairStyleWoman
                }
            }

            return item
        }).filter(v => {
            return !ignoreList.includes(v.key)
        })
    }, [sex])

    const lockAttr = (attr: keyof AvatarFullConfig) => {
        onChangeLockedAttr?.([...lockedAttr, attr])
    }

    const unlockAttr = (attr: keyof AvatarFullConfig) => {
        onChangeLockedAttr?.(lockedAttr.filter(item => item !== attr))
    }

    const clearLockedAttr = () => {
        onChangeLockedAttr?.([])
    }

    return (
        <div className={`flex flex-col gap-2 min-w-420px ${className}`} style={style}>
            <div className='flex justify-between'>
                <div style={{ width: 120 }}>Seed</div>
                <Input style={{ width: 180 }} value={seedValue} onChange={(e) => {

                    onChangeSeedValue?.(e.target.value, lockedAttr)
                }} />
            </div>

            {
                list.map(({ key, label, items }) => {
                    const isLocked = lockedAttr.includes(key)
                    const isColorAttr = key.endsWith('Color');
                    return (
                        <div key={key} className='flex justify-between'>
                            <div style={{ width: 120 }}>{label}</div>
                            <div className="flex justify-end mr-2 text-sm" style={{ width: 60 }}>
                                {
                                    isLocked ?
                                        <button onClick={() => unlockAttr(key)}>Unlock</button> :
                                        <button onClick={() => lockAttr(key)}>Lock</button>
                                }
                            </div>
                            {

                                isColorAttr ? (
                                    <input
                                        disabled={isLocked}
                                        style={{ width: 180 }}
                                        value={(config[key] || '#000000') as string}
                                        onChange={(e) => {
                                            updateConfig(key as keyof AvatarFullConfig, e.target.value)
                                        }}
                                        type="color"
                                    />
                                )
                                    : (
                                        <Select
                                            disabled={isLocked}
                                            style={{
                                                width: 180
                                            }}
                                            value={config?.[key] as string}
                                            onChange={value => {
                                                updateConfig(key as keyof AvatarFullConfig, value)
                                            }}
                                            items={items}
                                        />
                                    )
                            }



                        </div>
                    )
                })
            }


            <button className="mt-2 border py-2 rounded" onClick={() => clearLockedAttr()}>CLEAR LOCK</button>
        </div>
    )
}