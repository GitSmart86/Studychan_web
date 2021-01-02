import React, { useEffect, useState } from "react";
import axios from "../redux/authentication/axios";

import { List, Card, } from "antd";
import List_Tag from "./List_Tag";

function List_News(props) {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios
            .get(`api/news/?isPublished=true`)
            .then((response) => {
                console.log("NEWS: ", response.data);
                setData(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return data ? (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    // console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <List.Item.Meta
                        avatar={item.topic}
                        title={item.timestamp.toString().split("T")[0]}
                        extra={<List_Tag tags={item.tagged_news} />}
                    />

                    <Card
                        title={item.name}
                        size="small"
                    // style={{ width: 158 }}
                    // extra={
                    //     item.news_img != [] &&
                    //     item.news_img.map((img) => (
                    //         <img src={img.img} style={{
                    //             width: "50%",
                    //             marginLeft: "auto",
                    //             marginRight: "auto",
                    //         }} />
                    //     ))
                    // }
                    >
                        <p>{item.description}</p>
                        {
                            item.news_img != [] &&
                            item.news_img.map((img) => (
                                <img src={img.img} style={{
                                    width: "50%",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }} />
                            ))
                        }
                    </Card>
                </List.Item>
            )}
        />
    ) : null;
}

export default List_News;
