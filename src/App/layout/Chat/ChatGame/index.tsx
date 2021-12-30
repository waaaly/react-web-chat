import React, { useState } from 'react';
import { Radio, Drawer } from 'antd';
import Tetris from "@/App/layout/Chat/ChatGame/games/tetris"
import './index.less';

function CharGame() {
    const gamesOption = [
        { label: "俄罗斯方块", value: 'Tetris' },
        { label: "贪吃蛇", value: 'Snake' },
        { label: "待定", value: 'Wait' },
    ]
    const radioOnChange = (e) => {
        const { value } = e.target
        let obj = gamesOption.filter(e => e.value === value)
        setRadioValue(obj[0]?.value)
        setRadioLabel(obj[0]?.label)
    }
    const [radioValue, setRadioValue] = useState("")
    const [radioLabel, setRadioLabel] = useState("")
    const onClose = () => {
        setRadioValue("")
    }
    return (
        <div>
            <Radio.Group options={gamesOption} onChange={radioOnChange} value={radioValue} optionType="button" />
            <Drawer title={radioLabel} width={1500} placement="left" onClose={onClose} visible={radioValue !== ""}>
                <div style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0)" }}>
                    <Tetris radioValue={radioValue} />
                </div>
            </Drawer>
        </div>
    )
}

export default CharGame