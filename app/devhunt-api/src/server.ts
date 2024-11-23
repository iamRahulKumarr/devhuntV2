import { mongooseConnect } from "./connection";
import { env, validateEnv } from "./envConfig";
import app from "./app";

validateEnv(process.env);

const PORT = env.PORT;

//Database Connection
mongooseConnect();


app.listen(PORT, ()=>{
    console.log(`App is running on PORT ${PORT}`);
})
