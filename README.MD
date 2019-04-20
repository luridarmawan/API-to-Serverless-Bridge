# API to Serverless Bridge

Bridge code that makes it easy to migrate the existing REST API to [AWS](https://aws.amazon.com/) Serverless with API Gateway, **without too many changes in existing code**.


## Table of Contents

<details>
<summary>Click to expand</summary>

- [Objective](#objective)
- [Brief](#brief)
- [Solution](#solution)
- [Contributing](#contributing)
- [References](#references)

</details>



## Objective

The purpose of this repository is to give developers a way to move the Existing HTTP Node.js application and the REST API (including but not limited to using frameworks such as Express) to AWS Lambda Serverless, **without too many changes in existing code**.

Understanding Serverless and the use of Gateway API is quite a headache for some developers. Especially about how to **get** the data request and how to **send** the response.

This repository should contain:

- The code bridge library.
- Example Echo API controllers.

This repository does not contain:

- Code that comprises a complete application.

## Brief

For example, in the current API, we have  API url that gives echo from all value that receipt (GET):

[http://localhost:3000/test/echo?var1=value1&var2=value2](http://localhost:3000/test/echo?var1=value1&var2=value2)

which will display the following results:

```bash
# curl http://localhost:3000/test/echo?var1=value1
{
  "status": 200,
  "msg": "echo",
  "name": "Your System Name",
  "id": "",
  "query": {
    "var1": "value1"
  }
}

```

the router code is:

```js
router.get('/echo',(req, res) => {
  controller.echoController.echoGet(req,res);
});
```

and the controller code:

```js
function echoGet(req,res,next){
    console.log("ECHO: Get");
    let echoID = (typeof req.params.id === 'undefined') ? '' : req.params.id;
    res.header("x-header", "header content #1");
    return res.json({
        status: 200, 
        msg: 'echo', 
        name: Config.system.name, 
        id: echoID, 
        query: req.query
    });
}
```

It is not unusual for nodejs developers to use the 'req' parameter in retrieving data / parameters.

But on [Amazon Lambda](https://aws.amazon.com/lambda/), there are things that are slightly different in taking data / parameters. 
Amazon Lambda Function provides all content through an 'event', and the handling will be slightly different compared to the API in general.


AWS Lambda function code:

```js
module.exports.yourFunction = async (event, context, callback) => {
    //
    //
    //
};
```

that 'event' variable has everything that we need, like header, method, params, querystring, raw body, etc.

*So, how do I use AWS Lambda, but I don't want to make many changes to my code? And the PATH URL must be the same as before.*

## Solution

I have created a **wrapper** / **bridge** that will make it easier to combine AWS Lambda into the existing API Controller and embed it with the API Gateway, but still has the same URL path.

[See file "lambda_handler.js"](lambda_handler.js)

## How to Build

..

## Contributing

We are happy to accept more line code from the community. 🎉

## References

- [Amazon AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/index.html)
- [Amazon AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway/index.html)
- [Toolkit for building serverless applications](https://serverless.com/)
