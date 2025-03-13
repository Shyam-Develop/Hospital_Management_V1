from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from datetime import datetime
import datetime as dt

app = Flask(__name__)
CORS(app)

# MySQL Configuration (Replace with your MySQL credentials)
app.config['MYSQL_HOST'] = 'MYSQL5044.site4now.net'
app.config['MYSQL_USER'] = '9cba9c_cafemgr'  
app.config['MYSQL_PASSWORD'] = 'Cafemgr@123'  
app.config['MYSQL_DB'] = 'db_9cba9c_cafemgr'  

# Initialize MySQL
mysql = MySQL(app)

@app.route('/api/medical-items', methods=['GET'])
def get_medical_items():
    try:
        cursor = mysql.connection.cursor()  # ✅ Create a cursor
        cursor.execute("""
            SELECT 
                id AS RecordID, 
                category_name AS Name 
            FROM MedicalItems
        """)
        results = cursor.fetchall()
        cursor.close()

        if results:
            medicalItem_list = [{"RecordID": row[0], "Name": row[1]} for row in results]
            return jsonify({"status": "Y", "data": medicalItem_list}), 200
        else:
            return jsonify({"status": "N", "message": "No items found"}), 404

    except Exception as e:
        return jsonify({"status": "N", "message": str(e)}), 500


#Get by id
from flask import jsonify
from datetime import datetime

@app.route('/api/related-items/<int:category_id>', methods=['GET'])
def get_related_items(category_id):
    try:
        cursor = mysql.connection.cursor()
        query = """
            SELECT 
                R.item_id AS RecordID, 
                M.category_name AS CategoryName, 
                R.item_name AS Name,
                R.itemNumber AS ItemNumber,
                R.price AS Price,
                R.uom AS UOM,
                R.cuom AS CUOM,
                R.expirydate AS ExpiryDate,
                R.mrp AS MRP,
                R.gst AS GST,
                R.sgst AS SGST,
                R.cgst AS CGST,
                R.Discount AS Discount
            FROM MedicalRelatedItems R
            JOIN MedicalItems M ON R.category_id = M.id
            WHERE M.id = %s
        """
        cursor.execute(query, (category_id,))
        results = cursor.fetchall()
        cursor.close()

        if results:
            related_items = []
            for row in results:
                expiry_date = row[7].strftime("%Y-%m-%d") if row[7] else None  # ExpiryDate column
        
                related_items.append({
                    "RecordID": row[0], 
                    "CategoryName": row[1], 
                    "Name": row[2], 
                    "ItemNumber": row[3],
                    "Price": row[4],
                    "UOM": row[5],
                    "CUOM": row[6],
                    "ExpiryDate": expiry_date,  # Formatted expiry date
                    "MRP": row[8],
                    "GST": row[9],
                    "CGST": row[10],
                    "SGST": row[11],
                    "Discount": row[12],
                })

            return jsonify({"status": "Y", "data": related_items}), 200
        else:
            return jsonify({"status": "N", "message": "No related items found"}), 404

    except Exception as e:
        return jsonify({"status": "N", "message": str(e)}), 500

# @app.route('/api/related-items/<int:category_id>', methods=['GET'])
# def get_related_items(category_id):
    
#     try:

#         cursor = mysql.connection.cursor()
#         query = """
#             SELECT 
#                 R.item_id AS RecordID, 
#                 M.category_name AS CategoryName, 
#                 R.item_name AS Name,
#                 R.itemNumber AS ItemNumber,
#                 R.price AS Price,
#                 R.uom AS UOM,
#                 R.cuom AS CUOM,
#                 R.expirydate AS ExpiryDate,
#                 R.mrp AS MRP,
#             R.gst AS GST,
#             R.sgst AS SGST,
#             R.cgst AS CGST
#             FROM MedicalRelatedItems R
#             JOIN MedicalItems M ON R.category_id = M.id
#             WHERE M.id = %s
#         """
#         cursor.execute(query, (category_id,))
#         results = cursor.fetchall()
#         cursor.close()
#         if results:
#             related_items = [
#                 {
#                     "RecordID": row[0], 
#                     "CategoryName": row[1], 
#                     "Name": row[2], 
#                     "ItemNumber": row[3],
#                     "Price": row[4],
#                     "UOM": row[5],
#                     "CUOM": row[6],
#                     "ExpiryDate": row[7],
#                     "MRP": row[8],
#                     "GST":row[9],
#                     "CGST":row[10],
#                     "SGST":row[11]
#                 } 
#                 for row in results
#             ]
#             return jsonify({"status": "Y", "data": related_items}), 200
#         else:
#             return jsonify({"status": "N", "message": "No related items found"}), 404

#     except Exception as e:
#         return jsonify({"status": "N", "message": str(e)}), 500

@app.route('/api/related-items-fields/<int:item_id>', methods=['GET'])
def get_related_items_fields(item_id):
    try:
        cursor = mysql.connection.cursor()
        
        query = """
            SELECT 
                item_id AS RecordID, 
                item_name AS Name,
                itemNumber AS ItemNumber,
                price AS Price,
                uom AS UOM,
                cuom AS CUOM,
                expirydate AS ExpiryDate,
                mrp AS MRP,
                gst AS GST, 
                sgst AS SGST,
                cgst AS CGST,
                discount AS Discount
            FROM MedicalRelatedItems 
            WHERE item_id = %s
        """
        cursor.execute(query, (item_id,))
        result = cursor.fetchone()  # Fetch only one record since item_id is unique
        cursor.close()

        if result:
            related_item = {
                "RecordID": result[0], 
                "Name": result[1], 
                "ItemNumber": result[2],
                "Price": result[3],
                "UOM": result[4],
                "CUOM": result[5],
                "MRP": result[7], 
                "GST": result[8],
                "SGST": result[9],
                "CGST": result[10], 
                "Discount": result[11],
                "ExpiryDate": result[6].strftime('%d-%m-%Y') if result[6] else None  
            }
            
            return jsonify({"status": "Y", "data": related_item}), 200
        else:
            return jsonify({"status": "N", "message": "No related item found"}), 404

    except Exception as e:
        return jsonify({"status": "N", "message": str(e)}), 500


# 2. Create: Add a new employee
# @app.route('/HMS_QUEUE/createqueue', methods=['POST'])
# def post_queue():
#     data = request.get_json()  # Get the JSON data from the request
    
#     # Ensure the required fields are provided
#     Q_DATE = data.get('Q_DATE')
#     Q_CUSTOMERNAME = data.get('Q_CUSTOMERNAME')
#     Q_ITEMNUMBER = data.get('Q_ITEMNUMBER')
#     Q_DESCRIPTION = data.get('Q_DESCRIPTION')
#     Q_QUANTITY = data.get('Q_QUANTITY')
#     Q_PRICE = data.get('Q_PRICE')
#     Q_AMOUNT = data.get('Q_AMOUNT')
#     Q_GST = data.get('Q_GST')
#     Q_CGST = data.get('Q_CGST')
#     Q_SGST = data.get('Q_SGST')
#     Q_MRP = data.get('Q_MRP')
#     Q_UOM = data.get('Q_UOM')
#     Q_CUOM = data.get('Q_CUOM')
#     Q_EXPIRYDATE = data.get('Q_EXPIRYDATE')
#     Q_GSTTOTAL = data.get('Q_GSTTOTAL')
#     Q_NETTOTAL = data.get('Q_NETTOTAL')
        
#     cursor = None
#     try:
#         # Establish a connection to the database
#         cursor = mysql.connection.cursor()

#         # Insert the new HMS_QUEUE into the database
#         cursor.execute("""
#             INSERT INTO HMS_QUEUE 
#             (Q_DATE,Q_CUSTOMERNAME, Q_ITEMNUMBER, Q_DESCRIPTION, Q_QUANTITY, Q_PRICE, Q_AMOUNT, 
#             Q_GST, Q_CGST, Q_SGST, Q_MRP, Q_UOM, Q_CUOM, Q_GSTTOTAL,Q_EXPIRYDATE,Q_NETTOTAL) 
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#         """, (Q_DATE,Q_CUSTOMERNAME, Q_ITEMNUMBER, Q_DESCRIPTION, Q_QUANTITY, Q_PRICE, Q_AMOUNT, 
#               Q_GST, Q_CGST, Q_SGST, Q_MRP, Q_UOM, Q_CUOM, Q_GSTTOTAL, Q_EXPIRYDATE, Q_NETTOTAL))

#         # Commit the transaction
#         mysql.connection.commit()

#         # Return success message
#         return jsonify({'message': 'Queue created successfully'}), 200

#     except Exception as e:
#         # Handle database connection or execution errors
#         return jsonify({'message': str(e)}), 500

#     finally:
#         # Close the cursor
#         cursor.close()




#---------------------------------------------------post_header--------------------------------------------------------------------------------------------------------------

@app.route('/api/hms_header/createheader', methods=['POST'])
def post_header():
    data = request.get_json()  # Get the JSON data from the request
    
    # Ensure the required fields are provided
    H_CUSTOMERNAME = data.get('H_CUSTOMERNAME')
    H_DATE = data.get('H_DATE')
    H_REFERENCE = data.get('H_REFERENCE')
   
    try:
        cursor = mysql.connection.cursor()
        # Insert the new HMS_HEADER into the database
        cursor.execute("""
            INSERT INTO HMS_HEADER 
            (H_CUSTOMERNAME, H_DATE, H_REFERENCE)
            VALUES (%s, %s, %s)
        """, (H_CUSTOMERNAME, H_DATE, H_REFERENCE))
        
        # Commit the transaction
        mysql.connection.commit()

        # Fetch the generated RECORDID (assuming it's auto-incremented)
        cursor.execute("SELECT LAST_INSERT_ID()")
        record_id = cursor.fetchone()[0]  # This will return the last inserted ID

        # Return a success message with the RECORDID and customer name
        return jsonify({'status':'Y','message': 'Header created successfully', 'RecordID': record_id, 'CustomerName': H_CUSTOMERNAME}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
#---------------------------------------------------QUEUEINSERT--------------------------------------------------------------------------------------------------------------

# @app.route('/api/HMS_QUEUE/createqueue', methods=['POST'])
# def post_queue():
#     data = request.get_json()  # Get JSON data from the request

#     if not isinstance(data, list) or not data:
#         return jsonify({'message': 'Invalid data format. Expected a non-empty list of objects'}), 400

#     cursor = None
#     try:
#         # Extract customer name from the first object in the list
#         customer_name = data[0].get('Q_HRECORDID')

#         if not customer_name:
#             return jsonify({'message': 'Customer name is required'}), 400

#         # Establish a connection to the database
#         cursor = mysql.connection.cursor()

#         # Step 1: Delete existing records for the customer
#         delete_sql = "DELETE FROM HMS_QUEUE WHERE Q_HRECORDID = %s"
#         cursor.execute(delete_sql, (customer_name,))

#         # Step 2: Insert new records
#         insert_sql = """
#             INSERT INTO HMS_QUEUE 
#             (Q_RECORDID, Q_DATE, Q_HRECORDID, Q_CUSTOMERNAME, Q_ITEMNUMBER, Q_DESCRIPTION, Q_QUANTITY, Q_PRICE, Q_AMOUNT, 
#             Q_GST, Q_CGST, Q_SGST, Q_MRP, Q_UOM, Q_CUOM, Q_EXPIRYDATE, Q_NETTOTAL, Q_GSTTOTALAMOUNT, Q_DISCOUNT, Q_ADDITIONALDISCOUNT, Q_SUMMARY,Q_ITEMRECORDID,Q_STATUS,Q_ITEM) 
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s, %s,%s)
#         """

#         # Convert JSON data to a list of tuples for batch insertion
#         values = [
#             (
#                 item.get('Q_RECORDID'),
#                 item.get('Q_DATE'),
#                 item.get('Q_HRECORDID'),
#                 item.get('Q_CUSTOMERNAME'),
#                 item.get('Q_ITEMNUMBER'),
#                 item.get('Q_DESCRIPTION'),
#                 item.get('Q_QUANTITY'),
#                 item.get('Q_PRICE'),
#                 item.get('Q_AMOUNT'),
#                 item.get('Q_GST'),
#                 item.get('Q_CGST'),
#                 item.get('Q_SGST'),
#                 item.get('Q_MRP'),
#                 item.get('Q_UOM'),
#                 item.get('Q_CUOM'),
#                 item.get('Q_EXPIRYDATE'),
#                 item.get('Q_NETTOTAL'),
#                 item.get('Q_GSTTOTALAMOUNT'),
#                 item.get('Q_DISCOUNT'),  # Corrected order
#                 item.get('Q_ADDITIONALDISCOUNT'),  # Corrected order
#                 item.get('Q_SUMMARY'),
#                 item.get('Q_ITEMRECORDID'),
#                  item.get('Q_STATUS'),
#                 item.get('Q_ITEM'),
#             ) for item in data
#         ]

#         # Execute batch insert
#         cursor.executemany(insert_sql, values)

#         # Commit the transaction
#         mysql.connection.commit()

#         return jsonify({'message': 'Queue updated successfully'}), 200

#     except Exception as e:
#         # Handle database connection or execution errors
#         mysql.connection.rollback()  # Rollback transaction in case of error
#         return jsonify({'message': str(e)}), 500

#     finally:
#         # Close the cursor
#         if cursor:
#             cursor.close()


# @app.route('/api/HMS_QUEUE/createqueue', methods=['POST'])
# def post_queue():
#     data = request.get_json()  # Get JSON data from the request

#     if not isinstance(data, list) or not data:
#         return jsonify({'message': 'Invalid data format. Expected a non-empty list of objects'}), 400

#     cursor = None
#     try:
#         # Extract HRECORDID from the first object in the list
#         hrecordid = data[0].get('Q_HRECORDID')

#         if not hrecordid:
#             return jsonify({'message': 'HRECORDID is required'}), 400

#         # Establish a connection to the database
#         cursor = mysql.connection.cursor()

#         # Step 1: Delete existing records for the HRECORDID
#         delete_sql = "DELETE FROM HMS_QUEUE WHERE Q_HRECORDID = %s"
#         cursor.execute(delete_sql, (hrecordid,))

#         # Step 2: Insert new records into HMS_QUEUE
#         insert_sql = """
#             INSERT INTO HMS_QUEUE 
#             (Q_RECORDID, Q_DATE, Q_HRECORDID, Q_CUSTOMERNAME, Q_ITEMNUMBER, Q_DESCRIPTION, Q_QUANTITY, Q_PRICE, Q_AMOUNT, 
#             Q_GST, Q_CGST, Q_SGST, Q_MRP, Q_UOM, Q_CUOM, Q_EXPIRYDATE, Q_NETTOTAL, Q_GSTTOTALAMOUNT, Q_DISCOUNT, Q_ADDITIONALDISCOUNT, 
#             Q_SUMMARY, Q_ITEMRECORDID, Q_STATUS, Q_ITEM,Q_DiscountAmount,Q_GSTAMOUNT,Q_CGSTAMOUNT,Q_SGSTAMOUNT) 
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s,%s, %s,%s)
#         """

#         # Convert JSON data to a list of tuples for batch insertion
#         values = [
#             (
#                 item.get('Q_RECORDID'),
#                 item.get('Q_DATE'),
#                 item.get('Q_HRECORDID'),
#                 item.get('Q_CUSTOMERNAME'),
#                 item.get('Q_ITEMNUMBER'),
#                 item.get('Q_DESCRIPTION'),
#                 item.get('Q_QUANTITY'),
#                 item.get('Q_PRICE'),
#                 item.get('Q_AMOUNT'),
#                 item.get('Q_GST'),
#                 item.get('Q_CGST'),
#                 item.get('Q_SGST'),
#                 item.get('Q_MRP'),
#                 item.get('Q_UOM'),
#                 item.get('Q_CUOM'),
#                 item.get('Q_EXPIRYDATE'),
#                 item.get('Q_NETTOTAL'),
#                 item.get('Q_GSTTOTALAMOUNT'),
#                 item.get('Q_DISCOUNT'),
#                 item.get('Q_ADDITIONALDISCOUNT'),
#                 item.get('Q_SUMMARY'),
#                 item.get('Q_ITEMRECORDID'),
#                 item.get('Q_STATUS'),
#                 item.get('Q_ITEM'),
#                   item.get('Q_DiscountAmount'),
#                    item.get('Q_GSTAMOUNT'),
#                 item.get('Q_CGSTAMOUNT'),
#                   item.get('Q_SGSTAMOUNT'),
#             ) for item in data
#         ]

#         # Execute batch insert
#         cursor.executemany(insert_sql, values)

#         # Step 3: Update the HMS_HEADER table based on aggregated values
#         update_header_sql = """
#             UPDATE HMS_HEADER 
#             SET 
#                 H_QNETTOTAL = (SELECT COALESCE((Q_NETTOTAL), 0) FROM HMS_QUEUE WHERE Q_HRECORDID = %s),
#                 H_QGSTTOTALAMOUNT = (SELECT COALESCE((Q_GSTTOTALAMOUNT), 0) FROM HMS_QUEUE WHERE Q_HRECORDID = %s),
#                 H_QDISCOUNT = (SELECT COALESCE((Q_DISCOUNT), 0) FROM HMS_QUEUE WHERE Q_HRECORDID = %s),
#                 H_QADDITIONALDISCOUNT = (SELECT COALESCE((Q_ADDITIONALDISCOUNT), 0) FROM HMS_QUEUE WHERE Q_HRECORDID = %s),
#                 H_QSUMMARY = (SELECT COALESCE(MAX(Q_SUMMARY), '') FROM HMS_QUEUE WHERE Q_HRECORDID = %s),
#                 H_STATUS = (SELECT COALESCE(MAX(Q_STATUS), '') FROM HMS_QUEUE WHERE Q_HRECORDID = %s)
#             WHERE H_RECORDID = %s
#         """
        
#         # Execute update query
#         cursor.execute(update_header_sql, (hrecordid, hrecordid, hrecordid, hrecordid, hrecordid, hrecordid, hrecordid))

#         # Commit the transaction
#         mysql.connection.commit()

#         return jsonify({"status": "Y", 'message': 'Queue updated successfully and header table updated'}), 200

#     except Exception as e:
#         # Handle database connection or execution errors
#         mysql.connection.rollback()  # Rollback transaction in case of error
#         return jsonify({'message': str(e)}), 500

#     finally:
#         # Close the cursor
#         if cursor:
#             cursor.close()


@app.route('/api/HMS_QUEUE/createqueue', methods=['POST'])
def post_queue():
    data = request.get_json()  # Get JSON data from the request

    if not isinstance(data, list) or not data:
        return jsonify({'message': 'Invalid data format. Expected a non-empty list of objects'}), 400

    cursor = None
    try:
        # Extract HRECORDID from the first object in the list
        hrecordid = data[0].get('Q_HRECORDID')

        if not hrecordid:
            return jsonify({'message': 'HRECORDID is required'}), 400

        # Establish a connection to the database
        cursor = mysql.connection.cursor()

        # Step 1: Delete existing records for the HRECORDID
        delete_sql = "DELETE FROM HMS_QUEUE WHERE Q_HRECORDID = %s"
        cursor.execute(delete_sql, (hrecordid,))

        # Step 2: Insert new records into HMS_QUEUE
        insert_sql = """
            INSERT INTO HMS_QUEUE 
            (Q_RECORDID, Q_DATE, Q_HRECORDID, Q_CUSTOMERNAME, Q_ITEMNUMBER, Q_DESCRIPTION, Q_QUANTITY, Q_PRICE, Q_AMOUNT, 
            Q_GST, Q_CGST, Q_SGST, Q_MRP, Q_UOM, Q_CUOM, Q_EXPIRYDATE, Q_NETTOTAL, Q_GSTTOTALAMOUNT, Q_DISCOUNT, 
            Q_ADDITIONALDISCOUNT, Q_SUMMARY, Q_ITEMRECORDID, Q_STATUS, Q_ITEM, Q_DiscountAmount, Q_GSTAMOUNT, Q_CGSTAMOUNT, Q_SGSTAMOUNT) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        # Convert JSON data to a list of tuples for batch insertion
        values = [
            (
                item.get('Q_RECORDID'),
                item.get('Q_DATE'),
                item.get('Q_HRECORDID'),
                item.get('Q_CUSTOMERNAME'),
                item.get('Q_ITEMNUMBER'),
                item.get('Q_DESCRIPTION'),
                item.get('Q_QUANTITY'),
                item.get('Q_PRICE'),
                item.get('Q_AMOUNT'),
                item.get('Q_GST'),
                item.get('Q_CGST'),
                item.get('Q_SGST'),
                item.get('Q_MRP'),
                item.get('Q_UOM'),
                item.get('Q_CUOM'),
                item.get('Q_EXPIRYDATE'),
                item.get('Q_NETTOTAL'),
                item.get('Q_GSTTOTALAMOUNT'),
                item.get('Q_DISCOUNT'),
                item.get('Q_ADDITIONALDISCOUNT'),
                item.get('Q_SUMMARY'),
                item.get('Q_ITEMRECORDID'),
                item.get('Q_STATUS'),
                item.get('Q_ITEM'),
                item.get('Q_DiscountAmount'),
                item.get('Q_GSTAMOUNT'),
                item.get('Q_CGSTAMOUNT'),
                item.get('Q_SGSTAMOUNT'),
            ) for item in data
        ]

        # Execute batch insert
        cursor.executemany(insert_sql, values)

        # Step 3: Update the HMS_HEADER table based on aggregated values
        update_header_sql = """
            UPDATE HMS_HEADER 
            SET 
                H_QNETTOTAL = (SELECT COALESCE(Q_NETTOTAL, 0) FROM HMS_QUEUE WHERE Q_HRECORDID = %s ORDER BY Q_RECORDID DESC LIMIT 1),
                H_QGSTTOTALAMOUNT = (SELECT COALESCE(Q_GSTTOTALAMOUNT, 0) FROM HMS_QUEUE WHERE Q_HRECORDID = %s ORDER BY Q_RECORDID DESC LIMIT 1),
                H_QDISCOUNT = (SELECT COALESCE(Q_DISCOUNT, 0) FROM HMS_QUEUE WHERE Q_HRECORDID = %s ORDER BY Q_RECORDID DESC LIMIT 1),
                H_QADDITIONALDISCOUNT = (SELECT COALESCE(Q_ADDITIONALDISCOUNT, 0) FROM HMS_QUEUE WHERE Q_HRECORDID = %s ORDER BY Q_RECORDID DESC LIMIT 1),
                H_QSUMMARY = (SELECT COALESCE(Q_SUMMARY, '') FROM HMS_QUEUE WHERE Q_HRECORDID = %s ORDER BY Q_RECORDID DESC LIMIT 1),
                H_STATUS = (SELECT COALESCE(Q_STATUS, '') FROM HMS_QUEUE WHERE Q_HRECORDID = %s ORDER BY Q_RECORDID DESC LIMIT 1)
            WHERE H_RECORDID = %s
        """

        # Execute update query
        cursor.execute(update_header_sql, (hrecordid, hrecordid, hrecordid, hrecordid, hrecordid, hrecordid, hrecordid))

        # Commit the transaction
        mysql.connection.commit()

        return jsonify({"status": "Y", 'message': 'Queue updated successfully and header table updated'}), 200

    except Exception as e:
        # Handle database connection or execution errors
        mysql.connection.rollback()  # Rollback transaction in case of error
        return jsonify({'message': str(e)}), 500

    finally:
        # Close the cursor
        if cursor:
            cursor.close()


#---------------------------------------------------HMS_HEADER=GET--------------------------------------------------------------------------------------------------------------
@app.route('/api/hms_header/getallheader', methods=['GET'])
def get_all_header():
    cursor = None
    try:
        # Establish a connection to the database
        cursor = mysql.connection.cursor()

        # SQL query to fetch only the required fields with alias names
        select_sql = """
          SELECT 
    H_RECORDID AS RecordID,
    H_CUSTOMERNAME AS Name,
    H_DATE AS date,
    H_STATUS AS Status
FROM HMS_HEADER 
WHERE H_STATUS = 'Q' OR H_STATUS IS NULL;
        """

        cursor.execute(select_sql)
        result = cursor.fetchall()

        # Get column names
        column_names = [desc[0] for desc in cursor.description]

        # Convert result to list of dictionaries
        medicalItem_list = [dict(zip(column_names, row)) for row in result]

        if not medicalItem_list:
            return jsonify({"status": "N", "message": "No data found"}), 404

        return jsonify({"status": "Y", "data": medicalItem_list}), 200

    except Exception as e:
        app.logger.error(f"Error fetching all Headers: {e}")
        return jsonify({"status": "N", "error": "Internal Server Error"}), 500

    finally:
        if cursor:
            cursor.close()




@app.route('/header/getheader/<H_STATUS>/<int:H_RECORDID>', methods=['GET'])
def get_header_by_status_and_id(H_STATUS, H_RECORDID):
    cursor = None  # Initialize cursor as None outside the try block
    try:
        # Open a cursor to the database
        cursor = mysql.connection.cursor()

        # Execute a parameterized query to fetch data based on Status and H_RECORDID
        cursor.execute('SELECT * FROM HMS_HEADER WHERE H_STATUS = %s AND H_RECORDID = %s', (H_STATUS, H_RECORDID))

        # Fetch the first row (if any)
        header = cursor.fetchone()

        # Check if data was found
        if header:
            header_data = {
                'RecordId': header[0],
                'CustomerName': header[1],
                'Date': header[2],
                'Reference': header[3],
                'QueueNetTotal': header[4],
                'QueueGstTotalAmount': header[5],
                'QueueDiscount': header[6],
                'QueueSummary': header[7],
                'QueueAdditionalDiscount': header[8],
                'Status': header[9],
                'QueueDiscountAmount': header[10],
                'Email': header[11],
                'PaidStatus': header[12],
                'PaidAmount': header[13],
                'ModeOfPayment': header[14],
                'WhatsApp':header[15],
                 'Emailcheck':header[16],
                  'HardCopy':header[17],
                  'ReferenceAny':header[18],
 'Insurance':header[19],
            }

            # Return a successful response with the data
            return jsonify({
                "data": header_data,
                "message": "Header fetched successfully",
                "status": "y"
            })
        else:
            # Return not found if no header is found for the given Status and H_RECORDID
            return jsonify({'message': 'Header not found'}), 404

    except Exception as e:
        # In case of an exception, return a 500 error with the exception message
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

    finally:
        # Ensure the cursor is closed if it was created
        if cursor:
            cursor.close()



# @app.route('/hms_header/updateheader/<int:H_RECORDID>', methods=['PUT'])
# def update_header(H_RECORDID):
#     data = request.get_json()
#     H_CUSTOMERNAME = data.get('H_CUSTOMERNAME')
#     H_DATE = data.get('H_DATE')
#     H_REFERENCE = data.get('H_REFERENCE')
#     H_QNETTOTAL = data.get('H_QNETTOTAL')
#     H_QGSTTOTALAMOUNT = data.get('H_QGSTTOTALAMOUNT')
#     H_QDISCOUNT = data.get('H_QDISCOUNT')
#     H_QSUMMARY = data.get('H_QSUMMARY')
#     H_QADDITIONALDISCOUNT = data.get('H_QADDITIONALDISCOUNT')
#     H_STATUS = data.get('H_STATUS')
#     H_QDISCOUNTAMOUNT = data.get('H_QDISCOUNTAMOUNT')
#     H_EMAIL = data.get('H_EMAIL')
#     H_PAIDSTATUS = data.get('H_PAIDSTATUS')
#     H_PAIDAMOUNT = data.get('H_PAIDAMOUNT')
#     H_MODEOFPAYMENT = data.get('H_MODEOFPAYMENT')
#     H_EMAILSTATUS = data.get('H_EMAILSTATUS')
#     H_WHATSAPPSTATUS = data.get('H_WHATSAPPSTATUS')
#     H_HARDCOPY = data.get('H_HARDCOPY')
#     H_INSURANCE = data.get('H_INSURANCE')
#     H_REFERENCEANY = data.get('H_REFERENCEANY')

#     cursor = None
#     try:
#         # Establish a connection to the database
#         cursor = mysql.connection.cursor()
#         # Update the data in the database
#         cursor.execute("""
#             UPDATE HMS_HEADER
#             SET 
#                 H_CUSTOMERNAME = %s, 
#                 H_DATE = %s, 
#                 H_REFERENCE = %s, 
#                 H_QNETTOTAL = %s, 
#                 H_QGSTTOTALAMOUNT = %s, 
#                 H_QDISCOUNT = %s, 
#                 H_QSUMMARY = %s, 
#                 H_QADDITIONALDISCOUNT = %s,
#                 H_STATUS = %s,
#                 H_QDISCOUNTAMOUNT = %s,
#                 H_EMAIL = %s,
#                 H_PAIDSTATUS = %s,
#                 H_PAIDAMOUNT = %s,
#                 H_MODEOFPAYMENT = %s,
#                 H_EMAILSTATUS = %s,
#                 H_WHATSAPPSTATUS = %s,
#                 H_HARDCOPY = %s   
#                 H_INSURANCE= %s  
#                 H_REFERENCEANY= %s               
#             WHERE H_RECORDID = %s
#         """, (H_CUSTOMERNAME, H_DATE, H_REFERENCE, H_QNETTOTAL, H_QGSTTOTALAMOUNT, 
#               H_QDISCOUNT, H_QSUMMARY, H_QADDITIONALDISCOUNT, H_STATUS, H_QDISCOUNTAMOUNT, H_EMAIL, H_PAIDSTATUS,
#             H_PAIDAMOUNT, H_MODEOFPAYMENT, H_EMAILSTATUS, H_WHATSAPPSTATUS, H_HARDCOPY,H_INSURANCE,H_REFERENCEANY, H_RECORDID))
#         # Commit the transaction
#         mysql.connection.commit()
#         return jsonify({'message': 'Header updated successfully'}), 200
#     except Exception as e:
#         # Handle database connection or execution errors
#         return jsonify({'message': str(e)}), 500
#     finally:
#         if cursor:
#             cursor.close()
from datetime import datetime

@app.route('/hms_header/updateheader/<int:H_RECORDID>', methods=['PUT'])
def update_header(H_RECORDID):
    data = request.get_json()

    H_CUSTOMERNAME = data.get('H_CUSTOMERNAME')
    H_DATE = data.get('H_DATE')
    H_REFERENCE = data.get('H_REFERENCE')
    H_QNETTOTAL = data.get('H_QNETTOTAL')
    H_QGSTTOTALAMOUNT = data.get('H_QGSTTOTALAMOUNT')
    H_QDISCOUNT = data.get('H_QDISCOUNT')
    H_QSUMMARY = data.get('H_QSUMMARY')
    H_QADDITIONALDISCOUNT = data.get('H_QADDITIONALDISCOUNT')
    H_STATUS = data.get('H_STATUS')
    H_QDISCOUNTAMOUNT = data.get('H_QDISCOUNTAMOUNT')
    H_EMAIL = data.get('H_EMAIL')
    H_PAIDSTATUS = data.get('H_PAIDSTATUS')
    H_PAIDAMOUNT = data.get('H_PAIDAMOUNT')
    H_MODEOFPAYMENT = data.get('H_MODEOFPAYMENT')
    H_EMAILSTATUS = data.get('H_EMAILSTATUS')
    H_WHATSAPPSTATUS = data.get('H_WHATSAPPSTATUS')
    H_HARDCOPY = data.get('H_HARDCOPY')
    H_INSURANCE = data.get('H_INSURANCE')
    H_REFERENCEANY = data.get('H_REFERENCEANY')

    cursor = None

    # Convert date to correct format (YYYY-MM-DD) if it's provided
    if H_DATE:
        try:
            H_DATE = datetime.strptime(H_DATE, "%a, %d %b %Y %H:%M:%S %Z").strftime("%Y-%m-%d")
        except ValueError:
            return jsonify({'message': 'Invalid date format. Expected format: "Tue, 25 Feb 2025 00:00:00 GMT"'}), 400

    try:
        # Establish a connection to the database
        cursor = mysql.connection.cursor()

        # Update the data in the database
        cursor.execute("""
            UPDATE HMS_HEADER
            SET 
                H_CUSTOMERNAME = %s, 
                H_DATE = %s, 
                H_REFERENCE = %s, 
                H_QNETTOTAL = %s, 
                H_QGSTTOTALAMOUNT = %s, 
                H_QDISCOUNT = %s, 
                H_QSUMMARY = %s, 
                H_QADDITIONALDISCOUNT = %s,
                H_STATUS = %s,
                H_QDISCOUNTAMOUNT = %s,
                H_EMAIL = %s,
                H_PAIDSTATUS = %s,
                H_PAIDAMOUNT = %s,
                H_MODEOFPAYMENT = %s,
                H_EMAILSTATUS = %s,
                H_WHATSAPPSTATUS = %s,
                H_HARDCOPY = %s, 
                H_INSURANCE = %s,  
                H_REFERENCEANY = %s               
            WHERE H_RECORDID = %s
        """, (H_CUSTOMERNAME, H_DATE, H_REFERENCE, H_QNETTOTAL, H_QGSTTOTALAMOUNT, 
              H_QDISCOUNT, H_QSUMMARY, H_QADDITIONALDISCOUNT, H_STATUS, H_QDISCOUNTAMOUNT, 
              H_EMAIL, H_PAIDSTATUS, H_PAIDAMOUNT, H_MODEOFPAYMENT, H_EMAILSTATUS, 
              H_WHATSAPPSTATUS, H_HARDCOPY, H_INSURANCE, H_REFERENCEANY, H_RECORDID))

        # Commit the transaction
        mysql.connection.commit()
        return jsonify({'message': 'Header updated successfully'}), 200

    except Exception as e:
        # Handle database connection or execution errors
        return jsonify({'message': str(e)}), 500

    finally:
        if cursor:
            cursor.close()



#---------------------------------------------------QUEUE=GET--------------------------------------------------------------------------------------------------------------

@app.route('/api/HMS_QUEUE/getqueue/<int:Q_HRECORDID>', methods=['GET'])
def get_queue_by_hrecordid(Q_HRECORDID):
    cursor = None
    try:
        cursor = mysql.connection.cursor()

        # SQL query to fetch item list
        select_items_sql = """
            SELECT
                Q_RECORDID AS RecordID,
                Q_ITEMNUMBER AS ItemNumber,
                Q_DESCRIPTION AS Name,
                Q_QUANTITY AS qty,
                Q_PRICE AS price,
                Q_AMOUNT AS amount,
                Q_GST AS gst,
                Q_CGST AS cgst,
                Q_SGST AS sgst,
                Q_MRP AS mrp,
                Q_UOM AS uom,
                Q_CUOM AS cuom,
                Q_EXPIRYDATE AS expiryDate,
                Q_ITEMRECORDID AS ItemRecordID,
                Q_ITEM AS Item,
                Q_DiscountAmount AS discountAmount,
                Q_CGSTAMOUNT AS cgstAmount,
                Q_SGSTAMOUNT AS sgstAmount,
                Q_GSTAMOUNT AS gstAmount
            FROM HMS_QUEUE
            WHERE Q_HRECORDID = %s
        """

        cursor.execute(select_items_sql, (Q_HRECORDID,))
        records = cursor.fetchall()

        column_names = [desc[0] for desc in cursor.description]
        rows = [dict(zip(column_names, row)) for row in records]

        # Convert expiryDate to datetime and format to YYYY-MM-DD
        for row in rows:  # Ensure you are iterating over rows here
            if "expiryDate" in row and row["expiryDate"]:
                # Check if expiryDate is a string in the format "Wed, 31 Dec 2025 00:00:00 GMT"
                if isinstance(row["expiryDate"], str):
                    try:
                        # Trim "Wed, " and " GMT" and parse the date
                        expiry_date_str = row["expiryDate"][5:-4]  # Remove the weekday and GMT part
                        row["expiryDate"] = datetime.strptime(expiry_date_str, '%d %b %Y %H:%M:%S')
                    except ValueError:
                        pass  # Handle invalid expiryDate format if necessary
                # Check if expiryDate is an actual datetime object
                elif isinstance(row["expiryDate"], datetime):  # If expiryDate is already a datetime object
                    row["expiryDate"] = row["expiryDate"].strftime("%Y-%m-%d")  # Format as "YYYY-MM-DD"
                # Check if expiryDate is a date object (it could be in some DB)
                elif isinstance(row["expiryDate"], dt.date):  # If expiryDate is a date object
                    row["expiryDate"] = row["expiryDate"].strftime("%Y-%m-%d")  # Format as "YYYY-MM-DD"

        # Query to fetch summary fields
        select_summary_sql = """
            SELECT
                Q_NETTOTAL AS netTotal,
                Q_GSTTOTALAMOUNT AS gstTotalAmount,
                Q_DISCOUNT AS discount,
                Q_ADDITIONALDISCOUNT AS additionalDiscount,
                Q_SUMMARY AS summary,
                Q_DATE AS date,
                Q_CUSTOMERNAME AS customerName
            FROM HMS_QUEUE
            WHERE Q_HRECORDID = %s
            LIMIT 1
        """

        cursor.execute(select_summary_sql, (Q_HRECORDID,))
        summary_record = cursor.fetchone()

        summary_columns = [desc[0] for desc in cursor.description]
        summary_data = dict(zip(summary_columns, summary_record)) if summary_record else {}

        # Convert summary date to YYYY-MM-DD format
        if "date" in summary_data and isinstance(summary_data["date"], (datetime, dt.date)):
            summary_data["date"] = summary_data["date"].strftime("%Y-%m-%d")

        if not rows:
            return jsonify({'message': 'No records found for the provided HRECORDID'}), 404

        response_data = {
            "Rows": rows,
            **summary_data  # Merge summary fields
        }

        return jsonify({'message': 'Queue Get Successfully', 'data': response_data}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500

    finally:
        if cursor:
            cursor.close()       























@app.route('/api/getdoctor/<int:DR_ID>', methods=['GET'])
def get_doctor(DR_ID):
    # If DR_ID is 0, return an empty structure without querying the database
    if DR_ID == 0:
        doctor_data = {
            'RecordId': "", 
            'FirstName': "", 
            'LastName': "", 
            'GlobalID': "", 
            'Email': "", 
            'PhoneNumber': "", 
            'AlternatePhone': "",
            'Qualification': "", 
            'SpecialQualification': "",
            'DateOfBirth': "",  
            'DateOfJoining': ""
        }
        return jsonify({"data": doctor_data, "status": "y"}), 200

    # Use cursor properly
    cursor = mysql.connection.cursor()
    
    # Query using %s placeholder (specific to MySQL)
    cursor.execute("SELECT * FROM hms_doctor WHERE DR_ID = %s", (DR_ID,))
    
    # Fetch one result
    doctor = cursor.fetchone()
    cursor.close()  # Close cursor to prevent memory leaks

    if doctor:
        # Format DateOfBirth if it exists
 
        
        # Create doctor_data dictionary with the formatted DateOfBirth
        doctor_data = {
            'RecordId': doctor[0], 
            'FirstName': doctor[1], 
            'LastName': doctor[2], 
            'GlobalID': doctor[3], 
            'Email': doctor[4], 
            'PhoneNumber': doctor[5], 
            'AlternatePhone': doctor[6],
            'Qualification': doctor[7], 
            'SpecialQualification': doctor[8],
            'DateOfBirth':  doctor[9],  # Use the formatted DateOfBirth here
            'DateOfJoining': doctor[10]
        }
        return jsonify({"data": doctor_data, "status": "y"}), 200
    else:
        return jsonify({'message': 'Doctor not found'}), 404

@app.route('/api/getpatient/<int:PA_ID>', methods=['GET'])
def get_patient(PA_ID):
    if PA_ID == 0:
        patient_data = {
            'RecordId': "", 
            'FirstName': "", 
            'LastName': "", 
            'Email': "", 
            'Phone': "", 
            'AlternatePhone': "",
            'DateOfBirth': "",  
            'DateOfJoining': ""
        }
        return jsonify({"data": patient_data, "status": "y"}), 200  # Fixed incorrect variable name

    # Use cursor properly
    cursor = mysql.connection.cursor()
    
    # Query using %s placeholder (specific to MySQL)
    cursor.execute("SELECT * FROM hms_patient WHERE PA_ID = %s", (PA_ID,))
    
    # Fetch one result
    patient = cursor.fetchone()
    cursor.close()  # Ensure cursor is closed to avoid memory leaks

    if patient:
        # Format DateOfBirth and DateOfJoining if they exist


        patient_data = {
            'RecordId': patient[0], 
            'FirstName': patient[1], 
            'LastName': patient[2], 
            'Email': patient[3],
            'Phone': patient[4], 
            'AlternatePhone': patient[5],
            'DateOfBirth':  patient[6],  # Ensuring proper formatting
            'DateOfJoining':  patient[7]  # Ensuring proper formatting
        }
        
        return jsonify({"data": patient_data, "status": "y"}), 200  
    else:
        return jsonify({'message': 'Patient not found'}), 404  # Fixed response message format



#3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333#
@app.route('/api/doctor', methods=['GET'])
def get_doctors():
    try:
        cursor = mysql.connection.cursor()
        
        # Select query with aliases
        cursor.execute("""
            SELECT 
                DR_ID AS 'RecordId', 
                DR_FirstName AS 'FirstName', 
                DR_LastName AS 'LastName', 
                DR_GlobalID AS 'GlobalID', 
                DR_EmailID AS 'Email', 
                DR_PhoneNumber AS 'PhoneNumber', 
                DR_AlternatePhone AS 'AlternatePhone', 
                DR_Qualification AS 'Qualification', 
                DR_SpecialQualification AS 'SpecialQualification', 
                DR_DateOfBirth AS 'DateOfBirth', 
                DR_DateOfJoining AS 'DateOfJoining'
            FROM hms_doctor
        """)
        
        doctors = cursor.fetchall()  # Get all rows

        if doctors:
            doctor_list = []
            for doctor in doctors:
                # Reformat date fields (if needed)
                date_of_birth = doctor[9].strftime('%d-%m-%Y') if doctor[9] else None
                date_of_joining = doctor[10].strftime('%d-%m-%Y') if doctor[10] else None
                doctor_data = {
                    "RecordId": doctor[0],
                    "FirstName": doctor[1],
                    "LastName": doctor[2],
                    "GlobalID": doctor[3],
                    "Email": doctor[4],
                    "PhoneNumber": doctor[5],
                    "AlternatePhone": doctor[6],
                    "Qualification": doctor[7],
                    "SpecialQualification": doctor[8],
                    "DateOfBirth": date_of_birth,
                    "DateOfJoining": date_of_joining
                }
                
                
                doctor_list.append(doctor_data)  # Append to the list
            
            return jsonify({"status": "Y", "data": doctor_list}), 200
        else:
            return jsonify({"status": "N", "message": "No doctors found"}), 404
    except Exception as e:
        return jsonify({"status": "N", "error": str(e)}), 500



# 4. Update: Update doctor by ID
# @app.route('/doctor/updatedoctor/<int:DR_ID>', methods=['PUT'])
# def update_doctor(DR_ID):
#     # Get the JSON data from the request
#     data = request.get_json()
    
#     cursor = mysql.connection.cursor()
#     cursor.execute('''UPDATE hms_doctor SET DR_FIRSTNAME = %s, DR_LASTNAME = %s, DR_GLOBALID = %s, 
#                      DR_EMAILID = %s, DR_PHONENUMBER = %s, DR_ALTERNATEPHONE = %s, 
#                      DR_QUALIFICATION = %s, DR_SPECIALQUALIFICATION = %s, 
#                      DR_DATEOFBIRTH = %s, DR_DateOfJoining = %s WHERE DR_ID = %s''',
#                    (data.get('DR_FIRSTNAME'), data.get('DR_LASTNAME'), data.get('DR_GLOBALID'),
#                     data.get('DR_EMAILID'), data.get('DR_PHONENUMBER'), data.get('DR_ALTERNATEPHONE'),
#                     data.get('DR_QUALIFICATION'), data.get('DR_SPECIALQUALIFICATION'),
#                     data.get('DR_DATEOFBIRTH'), data.get('DR_DateOfJoining'), DR_ID))
#     mysql.connection.commit()
#     cursor.close()
    
#     return jsonify({'message': 'Doctor updated successfully'})

@app.route('/doctor/updatedoctor/<RecordId>', methods=['PUT'])
def update_doctor(RecordId):
    try:
        # Get the JSON data from the request
        data = request.get_json()

        cursor = mysql.connection.cursor()
        cursor.execute('''UPDATE hms_doctor SET DR_FIRSTNAME = %s, DR_LASTNAME = %s, DR_GLOBALID = %s, 
                         DR_EMAILID = %s, DR_PHONENUMBER = %s, DR_ALTERNATEPHONE = %s, 
                         DR_QUALIFICATION = %s, DR_SPECIALQUALIFICATION = %s, 
                         DR_DATEOFBIRTH = %s, DR_DATEOFJOINING = %s WHERE DR_ID = %s''',
                       (data.get('FirstName'), data.get('LastName'), data.get('GlobalId'),
                        data.get('EmailId'), data.get('PhoneNumber'), data.get('AlernatePhone'),
                        data.get('Qualification'), data.get('SpecialQualification'),
                        data.get('DateOfBirth'), data.get('DateOfJoining'), RecordId))
        mysql.connection.commit()
        cursor.close()

        cursor.close()  # Close cursor
        return jsonify({"message": "Doctor updated successfully","status": "y"})

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

# 1. Create: Add a new doctor
# 1. Create: Add a new doctor
@app.route('/doctor/postdoctor', methods=['POST'])
def post_doctor():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Extract data
        DR_FIRSTNAME = data.get('FirstName')
        DR_LASTNAME = data.get('LastName')
        DR_GLOBALID = data.get('GlobalId')
        DR_EMAILID = data.get('EmailId')
        DR_PHONENUMBER = data.get('PhoneNumber')
        DR_ALTERNATEPHONE = data.get('AlernatePhone')
        DR_QUALIFICATION = data.get('Qualification')
        DR_SPECIALQUALIFICATION = data.get('SpecialQualification')
        DR_DATEOFBIRTH = data.get('DateOfBirth')
        DR_DATEOFJOINING = data.get('DateOfJoining')

        # SQL query to insert the doctor record
        cursor = mysql.connection.cursor()
        cursor.execute('''INSERT INTO hms_doctor (FirstName, LastName, GlobalId, 
                        EmailId, PhoneNumber, AlernatePhone, Qualification, 
                        SpecialQualification, DateOfBirth, DateOfJoining) 
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''', 
                    (DR_FIRSTNAME, DR_LASTNAME, DR_GLOBALID, DR_EMAILID, DR_PHONENUMBER,
                     DR_ALTERNATEPHONE, DR_QUALIFICATION, DR_SPECIALQUALIFICATION, 
                     DR_DATEOFBIRTH, DR_DATEOFJOINING))
        mysql.connection.commit()  # Commit changes
        cursor.close()  # Close cursor
        return jsonify({"message": "Doctor inserted successfully","status": "y"})

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

#GET
@app.route('/api/patient', methods=['GET'])
def get_patients():
    try:
        cursor = mysql.connection.cursor()
        
        # Select query with aliases
        cursor.execute("""
            SELECT 
                PA_ID AS 'RecordId', 
                PA_FirstName AS 'FirstName', 
                PA_LastName AS 'LastName', 
                PA_Email AS 'Email', 
                PA_Phone AS 'PhoneNumber', 
                PA_AlternatePhone AS 'AlternatePhone', 
                PA_DOB AS 'DateOfBirth', 
                PA_DOJ AS 'DateOfJoining'
            FROM hms_patient
        """)
        
        patient = cursor.fetchall()  # Get all rows

        if patient:
            patient_list = []
            for patient in patient:
                # Reformat date fields (if needed)
                date_of_birth = patient[6].strftime('%d-%m-%Y') if patient[6] else None
                date_of_joining = patient[7].strftime('%d-%m-%Y') if patient[7] else None
                patient_data = {
                    "RecordId": patient[0],
                    "FirstName": patient[1],
                    "LastName": patient[2],
                    "Email": patient[3],
                    "PhoneNumber": patient[4],
                    "AlternatePhone": patient[5],
                    "DateOfBirth": date_of_birth,
                    "DateOfJoining": date_of_joining
                }
                
                patient_list.append(patient_data)  # Append to the list
            
            return jsonify({"status": "Y", "data": patient_list}), 200
        else:
            return jsonify({"status": "N", "message": "No doctors found"}), 404
    except Exception as e:
        return jsonify({"status": "N", "error": str(e)}), 500






if __name__ == '__main__':
    app.run(debug=True)
