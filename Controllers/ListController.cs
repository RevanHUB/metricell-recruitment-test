using Microsoft.AspNetCore.Mvc;
using InterviewTest.Model;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;


namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("/id/[controller]")]
    public class ListController : ControllerBase
    {
        [HttpGet("/id/{id}")]
        public List<Employee> Get(int id) 
        {
            var employ = new List<Employee>();
            
                var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
                 using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();
                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT Name, Value FROM Employees where value = "+ id + ";";
                queryCmd.ExecuteNonQuery();
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {

                        employ.Add(new Employee
                        {
                            Name = reader.GetString(0),
                            Value = reader.GetInt32(1)
                        });

                    }
                }
            }

                return employ;

        }
        [HttpGet("/add/id={id}&name={name}")]
        public List<Employee> Post(int id, string name)
        {
            var employ = new List<Employee>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();
                var addQueryCmd = connection.CreateCommand();
                addQueryCmd.CommandText = @"INSERT INTO Employees VALUES ( '" + name + "', '" + id + "');";
                addQueryCmd.ExecuteNonQuery();
            }

            return employ;

        }

    }

    [ApiController]
    [Route("/delete/[controller]")]
    public class ModifyController : ControllerBase
    {
        [HttpGet("/delete/id={id}")]
        public List<Employee> Get(int id)
        {
            var employ = new List<Employee>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();
                var deleteQueryCmd = connection.CreateCommand();
                deleteQueryCmd.CommandText = @"DELETE FROM Employees WHERE value =  '" + id + "';";
                deleteQueryCmd.ExecuteNonQuery();
            }

            return employ;

        }
        [HttpGet("/modifyvalue/name={name}&value={value}")]
        public List<Employee> Get(string name, string value)
        {
            var employ = new List<Employee>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();
                var updateTableCmd = connection.CreateCommand();
                updateTableCmd.CommandText = @"UPDATE Employees SET value =  '" + value + "' WHERE name = '"+ name + "';";
                updateTableCmd.ExecuteNonQuery();
            }

            return employ;

        }
    }

    [ApiController]
    [Route("/modifyN/[controller]")]
    public class ModifyNameController : ControllerBase
    {

        [HttpGet("/modifyname/name={name}&value={value}")]
        public List<Employee> Get(string name, string value)
        {
            var employ = new List<Employee>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();
                var updateTableCmd = connection.CreateCommand();
                updateTableCmd.CommandText = @"UPDATE Employees SET name =  '" + name + "' WHERE value = '" + value + "';";
                updateTableCmd.ExecuteNonQuery();
            }

            return employ;

        }
    }
}
