/*
* crate by zhaohelin
* 说明：srcList比src优先,假如srcList为空或不传就会监测src，其他用法与antd的Image组件一样
*/

import React, { ReactNode } from 'react';
import { Image } from 'antd'
import { ImageProps } from 'rc-image';
import './index.less'
interface Props {
    src?: string;
    srcList?: string[];
    children?: ReactNode;
    imageProps?: ImageProps
}

function UIPreview(props: Props) {
    const { src, srcList, children, ...imageProps } = props;
    const imgId = String(Math.random()).substring(2)
    const triggerPreview = (e: any) => {
        if (e.target.tagName === 'IMG' && e.target.src)
            document.getElementById(imgId)?.click();
    }
    return (
        <>
            {props.children && <div onClick={triggerPreview} className='htmlPreview'>{children}</div>}
            {srcList && srcList.length
                ? <Image.PreviewGroup>
                    {props.srcList?.map((thisSrc, index) => {
                        return (
                            <Image id={imgId + (index ? index : '')} key={thisSrc} src={thisSrc} {...imageProps} hidden={!!children} />
                        )
                    })}
                </Image.PreviewGroup>
                : src && <Image id={imgId} src={src} {...imageProps} hidden={!!children} />
            }
        </>
    )
}
UIPreview.Group = Image.PreviewGroup;
export default UIPreview;