#!/usr/bin/env python
#-*- coding: utf-8 -*-
import rospy, os
import SimpleHTTPServer

pardir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def kill():
    os.system("kill -KILL " + str(os.getpid()))

os.chdir(os.path.dirname(__file__) + "/../src/pages")
rospy.init_node("webserver")
rospy.on_shutdown(kill)
SimpleHTTPServer.test()
