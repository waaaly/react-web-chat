
import React, { useState, useEffect } from 'react'
import './index.less'
import { useGetFacebag } from '@/App/httpClientRequest/useApi';
import { PlusOutlined } from '@ant-design/icons'
import { Upload, Button } from 'antd';
import { getToken } from "@/App/utils/operatorLocalStorage";
import { ManageFaceBag } from '../ChatTool'
export function ChatFaceBag(props) {
    const [facebagList, setFacebagList] = useState<string[]>([])
    const { request: getFacebag } = useGetFacebag();
    const uploadProp = {
        name: 'facebag',
        multiple: true,
        showUploadList: false,
        action: "http://1.12.246.138:3000/api/saveFacebag",
        headers: {
            Authorization: getToken(),
        },
        onChange: (e) => {
            console.log(e)
            var { file } = e
            if (file.status === 'done') {
                var { filename } = file.response
                console.log(filename)
                var list: string[] = facebagList
                list.push(`http://1.12.246.138:3000/facebag/${filename}`)
                setFacebagList(list)
            }
        }
    }

    useEffect(() => {
        (
            async () => {
                let { facebagList } = (await getFacebag()).data.data
                setFacebagList(facebagList)
            }
        )();
    }, [])

    function deleteFacebag(item: string) {
        console.log(item)
        var list = facebagList,
            index = list.indexOf(item);

        list.splice(index, 1)
        setFacebagList([...list])
    }

    return (
        <div className="face-bag-scroll">
            <ManageFaceBag facebagList={facebagList} onDeleteSuccess={deleteFacebag} />
            <ul className="face-bag-ul">
                {
                    facebagList.map(item => {
                        return (
                            <li onClick={() => props.onSelect(item)} key={item} className="face-bag-ul-li">
                                <img src={item} />
                            </li>
                        )
                    })
                }

                <li className="face-bag-ul-li">
                    <Upload {...uploadProp}>
                        <Button className="face-bag-ul-li-btn">
                            <PlusOutlined />
                        </Button>
                    </Upload>
                </li>
            </ul>
        </div>
    )
}

