import { Button, Form, Input } from 'antd';
import axios from 'axios';

const User = () => {
    // const [user, setUser] = useState(null);
    const onFinish = async (values) => {
        let response;
        response = await axios.post("/api/user/register", values);
        if (response.data.success) {
            alert(response.data.message);
        } else {
            alert('not connected');
        }
        console.log(values);
    };

    // const getUser = async () => {
    //     var response;
    //     try {
    //         response = await axios.get("/api/user/get-user");
    //         if (response.data.success) {
    //             setUser(response.data.data)
    //             console.log(response.data.data);
    //             alert(response.data.message);
    //         } else {
    //             alert(response.data.message);
    //         }
    //     } catch (error) {
    //         alert(error.message);
    //     }

    // };
    // useEffect(() => {
    //     getUser();
    //     // eslint-disable-next-line
    // }, [])

    return (
        <div className='container my-5'>
            <Form onFinish={onFinish}>
                <Form.Item label="Name" name="name">
                    <Input type='text' />
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input type='text' />
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input type='password' />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default User
