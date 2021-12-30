import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'antd'
import './index.less';

export default function Tetris(props) {
    const [grid, setGrid] = useState<any[]>([])
    const [switchL, setSwitchL] = useState(true)
    const [mode, setMode] = useState("normal")
    const [config, setConfig] = useState({
        countX: 18,
        countY: 9,
        downTime: 1000,
        boxSize: 50,
        aWay: "left",
        delayTime: 30,
    })
    const share = [
        { s: [[-1, 0], [0, 0], [1, 0], [1, 1]], c: "#f98866", p: [1, 1], n: "s1-1" },
        { s: [[1, 0], [1, 1], [1, 2], [0, 2]], c: "#f98866", p: [1, 1], n: "s1-2" },
        { s: [[-1, 0], [-1, 1], [0, 1], [1, 1]], c: "#f98866", p: [1, 1], n: "s1-3" },
        { s: [[0, 0], [0, 1], [0, 2], [1, 0]], c: "#f98866", p: [1, 1], n: "s1-4" },
        { s: [[-1, 0], [0, 0], [1, 0], [-1, 1]], c: "#ff420e", p: [1, 1], n: "s2-1" },
        { s: [[0, 0], [1, 0], [1, 1], [1, 2]], c: "#ff420e", p: [1, 1], n: "s2-2" },
        { s: [[-1, 1], [0, 1], [1, 1], [1, 0]], c: "#ff420e", p: [1, 1], n: "s2-3" },
        { s: [[0, 0], [0, 1], [0, 2], [1, 2]], c: "#ff420e", p: [1, 1], n: "s2-4" },
        { s: [[0, 0], [1, 0], [0, 1], [1, 1]], c: "#80bd9e", p: [0, 0], n: "s3-1" },
        { s: [[-1, 0], [0, 0], [1, 0], [2, 0]], c: "#89da59", p: [0, -2], n: "s4-1" },
        { s: [[0, 0], [0, 1], [0, 2], [0, 3]], c: "#89da59", p: [1, -2], n: "s4-2" },
        { s: [[0, 0], [-1, 1], [0, 1], [1, 1]], c: "#90afc5", p: [0, -1], n: "s5-1" },
        { s: [[-1, 0], [-1, 1], [-1, 2], [0, 1]], c: "#90afc5", p: [1, -1], n: "s5-2" },
        { s: [[-1, 0], [0, 0], [1, 0], [0, 1]], c: "#90afc5", p: [0, -1], n: "s5-3" },
        { s: [[0, 0], [0, 1], [0, 2], [-1, 1]], c: "#90afc5", p: [0, -1], n: "s5-4" },
        { s: [[-1, 0], [0, 0], [0, 1], [1, 1]], c: "#336b87", p: [0, -1], n: "s6-1" },
        { s: [[0, 0], [0, 1], [-1, 1], [-1, 2]], c: "#336b87", p: [0, 0], n: "s6-2" },
        { s: [[0, 0], [1, 0], [-1, 1], [0, 1]], c: "#763626", p: [0, 0], n: "s7-1" },
        { s: [[-1, 0], [-1, 1], [0, 1], [0, 2]], c: "#763626", p: [0, 1], n: "s7-2" },
        
    ]
    const scorres = useRef(0)
    const cruActive = useRef({ s: ['4-1', '5-1', '6-1', '6-2'], c: "#f98866", n: "s1-1" })
    const cruFinish = useRef([
        { p: '1-19', s: "static" },
        { p: '2-19', s: "static" },
        { p: '3-19', s: "static" },
        { p: '4-19', s: "static" },
        { p: '5-19', s: "static" },
        { p: '6-19', s: "static" },
        { p: '7-19', s: "static" },
        { p: '8-19', s: "static" },
        { p: '9-19', s: "static" },
    ])

    const skewing = useRef(0)
    const downIndex = useRef(0)
    const canButton = useRef(true)

    const getActiveGrid = (id) => {
        let c = false
        let d = cruActive.current.s.filter(e => e === id)
        let f: any = cruFinish.current.filter(e => e.p === id)
        let a = d.concat(f)
        if (a.length > 0) {
            c = true
        }
        return c
    }

    const getAcitveColor = (id) => {
        let color = "white"
        let d = cruActive.current.s.filter(e => e === id)
        if (d.length > 0) {
            color = cruActive.current.c
        }
        if (cruFinish.current.filter(e => e.p === id).length > 0) color = "ping"
        return color
    }

    const gInit = () => {
        let tGird: any[] = []
        for (let j = 1; j < config.countX + 1; j++) {
            for (let i = 1; i < config.countY + 1; i++) {
                let ids = String(i) + "-" + String(j)
                let g = {
                    id: ids,
                    show: getActiveGrid(ids),
                    x: i,
                    y: j,
                    color: getAcitveColor(ids)
                }
                tGird.push(g)
            }
        }
        setGrid(tGird)
    }

    const changeShare = () => {
        let cruAn = cruActive.current.n
        const b = share.filter(e => e.n === cruAn)[0].n
        let a = b.split('-')[0]
        let c = Number(b.split('-')[1])
        let nb: string | number = ''
        if (a === "s3") return
        if (a === "s1" || a === "s2" || a === "s5") {
            if (c === 4) {
                nb = 1
            } else {
                nb = c + 1
            }
        }
        if (a === "s6" || a === "s7" || a === "s4") {
            if (c === 2) {
                nb = 1
            } else {
                nb = c + 1
            }
        }
        let z: any = share.filter(e => e.n === (a + "-" + String(nb)))[0]
        let zs = z.s
        let ns: string[] = []
        zs.forEach(e => {
            let ex = e[0] + 5 + skewing.current + ((a === "s4" || a === "s5" || a === "s6" || a === "s7") ? (skewing.current > 0 ? z.p[1] : z.p[0]) : 0)
            let ey = e[1] + 1 + downIndex.current
            ns.push(String(ex) + '-' + String(ey))
        })
        if (!checkCanChange(ns)) return
        cruActive.current = { s: ns, c: z.c, n: a + "-" + String(nb) }
        // share.current = z
        gInit()
    }

    const checkCanChange = (ns) => {
        let cb = true
        cruFinish.current.forEach(e => {
            if (ns.filter(e1 => e1 === e.p).length > 0) {
                cb = false
            }
        })
        return cb
    }

    const changeAway = (away) => {
        if (checkAway(away)) return
        let ca = { ...cruActive.current }
        let cs = share.filter(e => e.n === ca.n)[0]
        let py = away === 'right' ? 0 : cs.p[0]
        let cas = ca.s.sort()
        if ((Number(cas[away === 'right' ? cas.length - 1 : 0].split('-')[0])) === (away === 'right' ? config.countY : 1)) return
        let ns: string[] = []
        cas.forEach(e => {
            let y = e.split("-")[0]
            let z = e.split("-")[1]
            ns.push(String(Number(y) + (away === 'right' ? 1 : -1)) + "-" + z)
        })
        if ((skewing.current) < 4 && away === 'right') {
            skewing.current += 1
        }
        if ((skewing.current > -4 + py) && away === 'left') {
            skewing.current -= 1
        }
        cruActive.current.s = ns
        gInit()
    }

    const checkAway = (away) => {
        let cb = false
        let cas = { ...cruActive.current }
        let newS: string[] = []
        cas.s.forEach(e => {
            let y = e.split("-")[0]
            let z = e.split("-")[1]
            newS.push(String(Number(y) + (away === 'right' ? 1 : -1)) + "-" + z)
        })
        newS.forEach(e => {
            if (cruFinish.current.filter(e1 => e1.p === e).length !== 0) {
                cb = true
            }
        })
        return cb
    }

    const changeDown = () => {
        if (oneGridFinish()) return
        downIndex.current += 1
        let ca = { ...cruActive.current }
        let cas = ca.s.sort()
        let ns: string[] = []
        cas.forEach((e) => {
            let y = e.split("-")[0]
            let z = e.split("-")[1]
            ns.push(y + "-" + String(Number(z) + 1))
        })
        cruActive.current.s = ns
        gInit()
    }

    const oneGridFinish = () => {
        let cb = false
        let cas = { ...cruActive.current }
        let newS: string[] = []
        cas.s.forEach(e => {
            let y = e.split("-")[0]
            let z = e.split("-")[1]
            newS.push(y + "-" + String(Number(z) + 1))
        })
        let ncas: any[] = []
        newS.forEach(e => {
            if (cruFinish.current.filter(e1 => e1.p === e).length !== 0 && !cb) {
                // clearInterval(t)
                cas.s.forEach((e1 => {
                    let obj = {
                        p: e1,
                        s: "none",
                        c: cas.c
                    }
                    ncas.push(obj)
                }))
                cb = true
            }
        })
        if (cb) checkClear(ncas)
        return cb
    }

    const checkClear = (ncas) => {
        canButton.current = false
        clearInterval(t)
        cruFinish.current = cruFinish.current.concat(ncas)
        cruActive.current = makeNew()
        downIndex.current = 0
        skewing.current = 0
        let f: any[] = []
        cruFinish.current.forEach(e => {
            if (e.s !== "static") {
                let x = Number(e.p.split('-')[0])
                let y = Number(e.p.split('-')[1])
                if (!f[y]) f[y] = []
                f[y].push(e)
            }
        })
        let xca: any[] = []
        f.forEach(e => {
            if (e.length === 9) {
                xca.push(e)
                e.forEach(e1 => {
                    let index = cruFinish.current.findIndex(e => e1.p === e.p)
                    cruFinish.current.splice(index, 1)
                })
            }
        })
        if (xca.length > 0) {
            xca.forEach(e => {
                let h1 = Number(e[0].p.split('-')[1])
                cruFinish.current.forEach((e2, index) => {
                    let y = Number(e2.p.split('-')[1])
                    let x = e2.p.split('-')[0]
                    if (e2.s !== "static" && (y < h1)) {
                        e2.p = x + '-' + String(y + 1)
                    }
                })
            })
            console.log("xca.lengch", xca.length, scorres)
            let s = 0
            switch (xca.length) {
                case 1:
                    scorres.current = scorres.current + 100
                    break
                case 2:
                    scorres.current = scorres.current + 500
                    break
                case 3:
                    scorres.current = scorres.current + 1000
                    break
                case 4:
                    scorres.current = scorres.current + 5000
                    break
            }
        }
        t = setInterval(() => {
            changeDown()
        }, config.downTime)
        canButton.current = true
    }

    const makeNew = () => {
        let obj: any = { s: ['5-1', '4-2', '5-2', '6-2'], n: "s5-1" }
        let ramIndex = Math.floor(Math.random() * share.length)
        let zs = share[ramIndex]
        let ns: string[] = []
        zs.s.forEach(e => {
            let ex = e[0] + 5
            let ey = e[1] + 1
            ns.push(String(ex) + '-' + String(ey))
        })
        obj = { s: ns, c: zs.c, n: zs.n }
        return obj
    }

    const keydown = (e) => {
        if (e.key === 'ArrowUp' && canButton.current) changeShare()
        if (e.key === "ArrowDown" && canButton.current) changeDown()
        if (e.key === "ArrowLeft" && canButton.current) changeAway('left')
        if (e.key === "ArrowRight" && canButton.current) changeAway('right')
    }

    const rePlay = () => {
        cruActive.current = { s: ['4-1', '5-1', '6-1', '6-2'], c: "#f98866", n: "s1-1" }
        cruFinish.current = [
            { p: '1-19', s: "static" },
            { p: '2-19', s: "static" },
            { p: '3-19', s: "static" },
            { p: '4-19', s: "static" },
            { p: '5-19', s: "static" },
            { p: '6-19', s: "static" },
            { p: '7-19', s: "static" },
            { p: '8-19', s: "static" },
            { p: '9-19', s: "static" },
        ]
        skewing.current = 0
        downIndex.current = 0
        canButton.current = true
        scorres.current = 0
        gInit()
    }

    let t: NodeJS.Timeout;
    useEffect(() => {
        gInit()
        t = setInterval(() => {
            changeDown()
        }, config.downTime)
        document.addEventListener("keydown", keydown)
    }, [])

    return (
        <div style={{ width: "100%", height: "100%", }} className="tow-box bg-orange">
            <div>
                <div>分数：{scorres.current}</div>
                <div><Button onClick={rePlay}>重來</Button></div>
                <div>
                    {grid.length > 0 &&
                        <div className="one-contant" style={{ width: (config.countY) * config.boxSize, height: (config.countX) * config.boxSize }}>
                            {grid.map((g, index) => {
                                // console.log("g...", g.color)
                                return (
                                    <div className="tow-box" key={index} style={{ backgroundColor: g.show ? g.color : "white", height: config.boxSize, width: config.boxSize }}>
                                        {/* {g.id} */}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}