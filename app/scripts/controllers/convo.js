'use strict';



angular.module('myappApp')
  .controller('ConvoCtrl', function ($scope, $q, Projects, Users, Messages, Conversations, $routeParams, $route) {
    $scope.project = {conversations:[]};
    $scope.users = [];
    $scope.space =' ';
    $scope.emptyConvo = true;
    $scope.editsubject = "";
    $scope.editmessage = "";
    $scope.editconvo = [];
    $scope.messageedit = [];
    var getPromise = Projects.get($routeParams.projectId);
    getPromise
        .then(function(data){
            $scope.project = data[0];
            $scope.emptyConvo = $scope.project.conversations.length === 0;
        }, function(){
            console.log(reason);
        });

    $scope.emptyConvo = $scope.project.conversations.length === 0;
    $scope.newConversation = {
        subject:"",
        messages:{
            user:"",
            message:""
        }
    };


    $scope.editSubject = function(conversation, i){
        $scope.editconvo[i] = true;
        $scope.editsubject = conversation.subject;
    }

    $scope.cancelEdit = function(conversation, i){
        $scope.editconvo[i] = false;
        conversation.subject = $scope.editsubject;
        $scope.closeConvo(conversation);
    }

    $scope.closeConvo=function(conversation){
        conversation.open=false;
        console.log(conversation);
    };

    $scope.openEditMessage = function(message,i){
        $scope.messageedit[i] = !$scope.messageedit[i];
        $scope.editmessage = message.message;
    }

    $scope.cancelEditMessage = function(message,i){
        $scope.messageedit[i] = !$scope.messageedit[i];
        message.message = $scope.editmessage;
    }

    $scope.addConversation = function (conversation, projectId){
        console.log(conversation);
        var postPromise = Projects.postConvo(conversation, projectId);
        postPromise
            .then(function(data){
                console.log(data);
                if (conversation.messages.user){
                var convoId = data._id;
                var cPostPromise = Projects.postMessage(conversation.messages, projectId, convoId);
                cPostPromise
                .then(function(){
                    $route.reload();
                },function(){
                    console.log(reason);
                }); 
                } else{
                    $route.reload();
                }

                
            },function(){
                console.log(reason);
            });
    };

    $scope.newMessage = {
        message:"",
        user:""
    };

    $scope.deleteConvo= function(conversation){
        var delPromise = Conversations.c_delete(conversation);
        delPromise
            .then(function(data){
                $route.reload();
            },function(){
                console.log(reason);
            });
    };

    $scope.addMessage = function (message, projectId, convoId){
        var postPromise = Projects.postMessage(message, projectId, convoId);
        postPromise
            .then(function(data){
                $route.reload();
            },function(){
                console.log(reason);
            });
    };

    $scope.editMessage = function(message){
        var putPromise = Messages.put(message);
        putPromise
            .then(function(){
                $route.reload();
            },function(){
                console.log(reason);
            });
    };

    $scope.editConvo = function(conversation){
        var putPromise = Conversations.put(conversation);
        putPromise
            .then(function(){
                $route.reload();
            },function(){
                console.log(reason);
            });
    };


    
  });

