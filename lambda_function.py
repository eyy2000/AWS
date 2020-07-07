import json
import boto3
from decimal import Decimal

client = boto3.resource('dynamodb')
table = client.Table('Test')


def lambda_handler(event, context):
    print("lambda_handler_start")
    incr = 1
    response = table.update_item(
        Key={
            'k': 'visitors'
        },
        UpdateExpression="set v = v + :incr",
        ExpressionAttributeValues={
            ':incr': Decimal(incr)
        },
        ReturnValues="UPDATED_NEW"
    )
    
    response = table.get_item(
    Key = {
        'k': 'visitors'
    }
    )
    
    item = response['Item']
    v = item['v']
    
    response = {
        'body': {
            'statusCode': 200,
            'body': v
        }
    }
    
    return response