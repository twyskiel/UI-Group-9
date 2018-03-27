"""Mathmagic App package configuration."""

from setuptools import setup

setup(
    name='mathmagic',
    version='0.1.0',
    packages=['mathmagic'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
