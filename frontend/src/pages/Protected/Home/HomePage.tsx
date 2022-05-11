import { Button, Card, Form, Input, Popover } from "antd";
import React from "react";
import AppDefaultContent from "../../../containers/AppContent/AppContent";
import CalorieTable from "./CalorieTable";
import Styles from "./HomePage.scss";

const AddFoodPopover = () => {
    return (
        <Popover
            placement="bottom"
            trigger="click"
            title="Enter your food details"
            content={
                <div>
                    <Form layout="vertical">
                        <Form.Item name="name" label="Food Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="quantity" label="Quantity">
                            <Input addonAfter="g" />
                        </Form.Item>
                        <Form.Item name="energy" label="Energy Content">
                            <Input addonAfter="kcal" />
                        </Form.Item>
                    </Form>
                    <div>asdf</div>
                </div>
            }
        >
            <Button style={{ marginRight: 20 }}>ADD FOOD</Button>
        </Popover>
    );
};

const ActionsView = () => {
    return (
        <div style={{ marginBottom: 20 }}>
            <AddFoodPopover />
            <Button>ADD EXCERCISE</Button>
        </div>
    );
};

const HomePage = () => {
    return (
        <AppDefaultContent>
            <ActionsView />
            <Card className={Styles.CalorieTableView}>
                <CalorieTable />
            </Card>
            <Card>
                <CalorieTable />
            </Card>
        </AppDefaultContent>
    );
};

export default HomePage;
