import app from "./app";
import { mongooseConnect } from "./connection";
import { env, validateEnv } from "./envConfig";

validateEnv(process.env);

const PORT = env.PORT;

//Database Connection
mongooseConnect();


app.listen(PORT, ()=>{
    console.log(`App is running on PORT ${PORT}`);
})
